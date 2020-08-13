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
  const [ items, setItems ] = React.useState([]);
  const [ finishedFetched, setFinishedFetching ] = React.useState(false);

  // track selection by ID
  const [ selectedItems, setSelectedItems ] = React.useState([]);

  const fetchItems = async () => {
    let resultsSnapshot;
    try {
      resultsSnapshot = await db.collection("items").get();
    } catch (err) {
      setFinishedFetching(true);
      alert('Something went wrong. Please try again later');
    }
    setFinishedFetching(true);

    // Usually we'd have a service to deserialize/serialize content
    // but let's leave it here for now.
    const deserializedResults = [];
    resultsSnapshot.forEach((snapshot) => {
      const data = snapshot.data();
      deserializedResults.push(new ChecklistItem(
        snapshot.id,
        data.type,
        data.name,
        data.lowPrice,
        data.highPrice
      ))
    })
    setItems(deserializedResults);
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
    return selectedItems.map((itemID) => items.find((item) => item.id === itemID)).reduce((sum, each) => sum + each.lowPrice, 0);
  }

  const selectedItemsMaxPrice = () => {
    return selectedItems.map((itemID) => items.find((item) => item.id === itemID)).reduce((sum, each) => sum + each.highPrice, 0);
  }

  const selectedItemsPriceRange = () => {
    return `$${selectedItemsMinPrice().toFixed(2)} - $${selectedItemsMaxPrice().toFixed(2)}`
  }

  const onComplete = () => {

  }

  const isOverBudget = () => {
    return props.minMaxBudget[1] < selectedItemsMinPrice();
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
    if (isOverBudget()) {
      return (
        <>
          <Typography variant="h6" component="h1" className={classes.overBudgetMessage}>You are over budget. Please consider either removing some items or adjusting your budget range.</Typography>
          <br />
          <br />
        </>
      )
    }
  }

  const groundCoverItems = () => {
    return items.filter((item) => (item.type === 'GROUND_COVER'))
  }

  const lightingItems = () => {
    return items.filter((item) => (item.type === 'LIGHTING'))
  }

  const fencingItems = () => {
    return items.filter((item) => item.type === 'FENCING_AND_PRIVACY');
  }

  const waterFeatures = () => {
    return items.filter((item) => item.type === 'WATER_FEATURES')
  }

  const structureItems = () => {
    return items.filter((item) => item.type === 'STRUCTURES')
  }

  const deckItems = () => {
    return items.filter((item) => item.type === 'DECK_MATERIAL')
  }

  if (!finishedFetched) {
    return (
      <div>
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    )
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
      <Typography variant="h6" component="h1" className={classes.itemTypeTitle}>Ground Cover</Typography>
      <Grid container spacing={3}>
        {
          groundCoverItems().map((item) => (
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
      <Typography variant="h6" component="h1" className={classes.itemTypeTitle}>Lighting</Typography>
      <Grid container spacing={3}>
        {
          lightingItems().map((item) => (
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
      <Typography variant="h6" component="h1" className={classes.itemTypeTitle}>Fencing & Privacy</Typography>
      <Grid container spacing={3}>
        {
          fencingItems().map((item) => (
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
      <Typography variant="h6" component="h1" className={classes.itemTypeTitle}>Water Features</Typography>
      <Grid container spacing={3}>
        {
          waterFeatures().map((item) => (
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
      <Typography variant="h6" component="h1" className={classes.itemTypeTitle}>Structures</Typography>
      <Grid container spacing={3}>
        {
          structureItems().map((item) => (
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
      <Typography variant="h6" component="h1" className={classes.itemTypeTitle}>Deck Materials</Typography>
      <Grid container spacing={3}>
        {
          deckItems().map((item) => (
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
      <Typography variant="h6" component="h1" className={classes.instructions}>Your budget range: ${props.minMaxBudget[0]} - ${props.minMaxBudget[1]}</Typography>
      <Typography variant="h6" component="h1" className={classes.instructions}>Price range for your selection: {selectedItemsPriceRange()}</Typography>
      <br />
      <br />
      {
        getBudgetHelperText()
      }
      <OnboardingStepNavBtns
        canGoNext={canGoNext()}
        activeStep="checklist"
        handleNext={onComplete}
        canGoBack={true}
      />
      <br />
      <br />
    </div>
  )

}
