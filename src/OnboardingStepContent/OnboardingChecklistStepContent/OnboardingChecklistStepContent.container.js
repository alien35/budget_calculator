import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import Loading from '../../Shared/Loading.component';
import OnboardingStepTitle from '../../Shared/OnboardingStep/OnboardingStepTitle.component';
import OnboardingStepSubtitle from '../../Shared/OnboardingStep/OnboardingStepSubtitle.component';
import OnboardingChecklistStepContentItem from './OnboardingChecklistStepContentItem.component';
import OnboardingStepNavBtns from '../../Shared/OnboardingStep/OnboardingStepNavBtns.component';
import CurrencyService from '../../Services/Currency.service';
import ApiService from '../../Services/Api.service';
import endpointsConstants from '../../constants/endpoints.constants';
import UserService from '../../Services/User.service';
import ChecklistItemService from '../../Services/ChecklistItem.service';
import checklistTypeToPrettyType from '../../constants/checklistTypeToPrettyType.constants';
import OnboardingStepChecklistAlert from '../../Shared/OnboardingStep/OnboardingStepChecklistAlert.component';

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
  itemTypeTitle: {
    width: '100%',
    display: 'flex',
    marginBottom: theme.spacing(2)
  },
  '@media (max-width: 560px)': {
    bottomText: {
      textAlign: 'left',
      paddingBottom: theme.spacing(1)
    }
  }
}));

export default function OnboardingChecklistStepContent(props) {
  const classes = useStyles();

  // track selection by ID
  const [ selectedItems, setSelectedItems ] = React.useState(props.user.selectedItems);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ groupedItems ] = React.useState(_.groupBy(props.items, 'type'));

  const onToggleIsSelected = (id) => {
    const isSelected = selectedItems.indexOf(id) > -1;
    let newSelectedItems;
    if (!isSelected) {
      newSelectedItems = [...selectedItems, id];
    } else {
      newSelectedItems = selectedItems.filter((itemID) => itemID !== id);
    }
    props.user.selectedItems = newSelectedItems;
    setSelectedItems(newSelectedItems)
  }

  const isItemSelected = (id) => {
    return selectedItems.indexOf(id) > -1;
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
    setIsLoading(true);
    try {
      await storeInDB(selectedItems);
    } catch (err) {
      alert('Something went wrong. Please try again later');
      return;
    }
    props.onComplete();
    setIsLoading(false);
  }

  const isOverBudget = () => {
    return props.user.budget.max < props.user.selectedItemsMinPrice(props.items);
  }

  const isUnderBudget = () => {
    return props.user.budget.min > props.user.selectedItemsMaxPrice(props.items);
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
        <OnboardingStepChecklistAlert>
          Please select at least one item before continuing.
        </OnboardingStepChecklistAlert>
      )
    }
    if (isOverBudget()) {
      return (
        <OnboardingStepChecklistAlert>
          You are over budget. Please consider either removing some items or adjusting your budget range ({props.user.budget.prettyMin()} - {props.user.budget.prettyMax()}).
        </OnboardingStepChecklistAlert>
      )
    }
    if (isUnderBudget()) {
      return (
        <OnboardingStepChecklistAlert>
          Looks like you can still afford more items!
        </OnboardingStepChecklistAlert>
      )
    }
  }

  if (isLoading) {
    // We rendering this here to not obstruct the
    // UI events occuring in the background
    // so we can provide a smooth experience
    return <Loading />
  }

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
        Object.keys(groupedItems).map((key) => (
          <React.Fragment key={key}>
            <Typography variant="h6" component="h1" className={classes.itemTypeTitle}>{checklistTypeToPrettyType[key]}</Typography>
            <Grid container spacing={3}>
              {
                groupedItems[key].map((item) => (
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
      {
        selectedItems.length ? (
          <Typography variant="h6" component="h1" className={classes.bottomText}>Estimate: {props.user.prettySelectedItemsPriceRange(props.items)}</Typography>
        ) : <div />
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
