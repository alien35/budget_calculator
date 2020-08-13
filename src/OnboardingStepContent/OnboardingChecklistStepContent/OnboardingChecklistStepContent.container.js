import React from 'react';
import * as firebase from 'firebase/app';
import ChecklistItem from '../../classes/ChecklistItem.class';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ImageConstants from '../../constants/Image.constants';
import ImageComponent from '../../Shared/Image.component';
import OnboardingStepTitle from '../../Shared/OnboardingStep/OnboardingStepTitle.component';
import OnboardingStepSubtitle from '../../Shared/OnboardingStep/OnboardingStepSubtitle.component';
import OnboardingChecklistStepContentItem from './OnboardingChecklistStepContentItem.component';
import OnboardingStepNavBtns from '../../Shared/OnboardingStep/OnboardingStepNavBtns.component';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import CurrencyService from '../../Services/Currency.service';
import ApiService from '../../Services/Api.service';
import endpointsConstants from '../../constants/endpoints.constants';
import UserService from '../../Services/User.service';
import ChecklistItemService from '../../Services/ChecklistItem.service';
import checklistTypeToPrettyType from '../../constants/checklistTypeToPrettyType.constants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  overBudgetMessage: {
    color: 'blue'
  },
  itemTypeTitle: {
    width: '100%',
    display: 'flex',
    marginBottom: theme.spacing(2)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}));

export default function OnboardingChecklistStepContent(props) {
  const classes = useStyles();

  const [ db ] = React.useState(firebase.firestore());

  console.log(props.user.selectedItems, 'props.user.selectedItems')
  // track selection by ID
  const [ selectedItems, setSelectedItems ] = React.useState(props.user.selectedItems);

  const [ items, setItems ] = React.useState({
    finishedFetched: false,
    groupedResult: null,
    result: null
  })

  const fetchItems = async () => {
    let result;
    try {
      result = await ApiService.get({
        endpoint: `${endpointsConstants.BASE_URL}/items`
      });
    } catch (err) {
      setItems({
        finishedFetching: true,
        groupedResult: null,
        result: null
      });
      return alert(err.error);
    }
    const deserializedResults = result.data.data.map((apiResult) => ChecklistItemService.deserialize(apiResult));
    setItems({
      finishedFetching: true,
      groupedResult: _.groupBy(deserializedResults, 'type'),
      result: deserializedResults
    })
  
  }

  console.log(items, 'items')

  React.useState(() => {
    fetchItems();
  }, [])

  const onToggleIsSelected = (id) => {
    const isSelected = selectedItems.indexOf(id) > -1;
    if (!isSelected) {
      setSelectedItems(() => [...selectedItems, id])
    } else {
      setSelectedItems(() => selectedItems.filter((itemID) => itemID !== id))
    }
  }

  const isItemSelected = (id) => {
    return selectedItems.indexOf(id) > -1;
  }

  const selectedItemsMinPrice = () => {
    return selectedItems.map((itemID) => items.result.find((item) => item.id === itemID)).reduce((sum, each) => sum + each.lowPrice, 0);
  }

  const selectedItemsMaxPrice = () => {
    return selectedItems.map((itemID) => items.result.find((item) => item.id === itemID)).reduce((sum, each) => sum + each.highPrice, 0);
  }

  const selectedItemsPriceRange = () => {
    return `${CurrencyService.convertToDollars(selectedItemsMinPrice())} - ${CurrencyService.convertToDollars(selectedItemsMaxPrice())}`
  }

  const storeInDB = async (selectedItems) => {
    try {
      props.user.selectedItems = selectedItems;
      await ApiService.post({
        endpoint: `${endpointsConstants.BASE_URL}/user`,
        payload: UserService.serialize(props.user)
      })
    } catch (err) {
      throw new Error(err);
    }
  }

  const onComplete = async () => {
    try {
      await storeInDB(selectedItems);
    } catch (err) {
      console.log(err, 'err here')
      alert('Something went wrong. Please try again later');
      return;
    }
    props.onComplete();
  }

  const isOverBudget = () => {
    console.log(selectedItemsMaxPrice(), 'hello', props.user.budget.max)
    return props.user.budget.max < selectedItemsMinPrice();
  }

  const isUnderBudget = () => {
    return props.user.budget.min > selectedItemsMaxPrice();
  }

  const canGoNext = () => {
    if (isOverBudget()) {
      return false;
    }
    if (!selectedItems.length) {
      return false;
    }
    return true;
  }

  const getBudgetHelperText = () => {
    if (!selectedItems.length) {
      return (
        <>
          <Typography variant="h6" component="h1" className={classes.overBudgetMessage}>Please select at least one item before continuing.</Typography>
          <br />
          <br />
        </>
      )
    }
    if (isOverBudget()) {
      return (
        <>
          <Typography variant="h6" component="h1" className={classes.overBudgetMessage}>You are over budget. Please consider either removing some items or adjusting your budget range.</Typography>
          <br />
          <br />
        </>
      )
    }
    // Looks like you can still afford more items!
  }

  if (!items.finishedFetching) {
    return (
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  console.log('not in the way here')

  return (
    <div className={classes.container}>
      <OnboardingStepTitle>
        Checklist
      </OnboardingStepTitle>
      <OnboardingStepSubtitle>
        Choose the items you wish to include. We'll keep track of your budget.
      </OnboardingStepSubtitle>
      <br />
      <br />
      {
        Object.keys(items.groupedResult).map((key) => (
          <React.Fragment key={key}>
            <Typography variant="h6" component="h1" className={classes.itemTypeTitle}>{checklistTypeToPrettyType[key]}</Typography>
            <Grid container spacing={3}>
              {
                items.groupedResult[key].map((item) => (
                  <React.Fragment key={item.id}>
                    <OnboardingChecklistStepContentItem
                      item={item}
                      isSelected={isItemSelected(item.id)}
                      onClick={() => onToggleIsSelected(item.id)}
                    />
                  </React.Fragment>
                ))
              }
            </Grid>
            <br />
            <br />
          </React.Fragment>
        ))
      }
      <Typography variant="h6" component="h1" className={classes.instructions}>Your budget range: {props.user.budget.prettyMin()} - {props.user.budget.prettyMax()}</Typography>
      {
        selectedItems.length && (
          <Typography variant="h6" component="h1" className={classes.instructions}>Price range for your selection: {selectedItemsPriceRange()}</Typography>
        )
      }
      <br />
      <br />
      {
        getBudgetHelperText()
      }
      <OnboardingStepNavBtns
        canGoNext={canGoNext()}
        activeStep="checklist"
        handleBack={props.handleBack}
        handleNext={onComplete}
        canGoBack={true}
      />
      <br />
      <br />
    </div>
  )

}
