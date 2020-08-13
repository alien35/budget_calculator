import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import OnboardingStepTitle from '../../Shared/OnboardingStep/OnboardingStepTitle.component';
import OnboardingStepSubtitle from '../../Shared/OnboardingStep/OnboardingStepSubtitle.component';
import TextField from '@material-ui/core/TextField';
import OnboardingStepNavBtns from '../../Shared/OnboardingStep/OnboardingStepNavBtns.component';
import * as firebase from 'firebase/app';

const useStyles = makeStyles((theme) => ({
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

export default function OnboardingBudgetStepContent(props) {

  const [ db ] = React.useState(firebase.firestore());
  const [ validMin, setValidMin ] = React.useState(true);
  const [ validMax, setValidMax ] = React.useState(true);
  const [ min, setMin ] = React.useState(props.minMaxBudget[0]);
  const [ max, setMax ] = React.useState(props.minMaxBudget[1]);
  
  const classes = useStyles();

  const onMinChange = (e) => {
    // Note, this does not account for pennies, so 23.22
    const numberInput = parseInt(e.target.value, 10);
    if (isNaN(numberInput)) {
      return setValidMin(false);
    }
    console.log(numberInput, 'num input')
    setMin(numberInput);
    setValidMin(true);
  }

  const onMaxChange = (e) => {
    // Note, this does not account for pennies, so 23.22
    const numberInput = parseInt(e.target.value, 10);
    if (isNaN(numberInput)) {
      return setValidMax(false);
    }
    console.log(numberInput, 'max in')
    setMax(numberInput);
    setValidMax(true);
  }

  const canGoNext = () => {
    if (!validMin) {
      return false;
    }
    if (!validMax) {
      return false;
    }
    return true;
  }

  const getHelperText = (which) => {
    const invalidNumberMessage = 'Enter a valid number';
    console.log('fetching text');
    switch (which) {
      case 'min': {
        return validMin ? '' : invalidNumberMessage;
      }
      case 'max': {
        return validMax ? '' : invalidNumberMessage;
      }
      default:
        return ''
    }
  }

  const storeInDB = async (min, max) => {
    // Here we are hard-coding user ID. Usually this
    // is done programatically in the authentication/authorization process
    var userRef = db.collection('user').doc('PDkodzyofSCKEudyzKSu');

    try {
      await userRef.set({
          maxBudget: max,
          minBudget: min
      }, { merge: true });
    } catch (err) {
      throw new Error();
    }
  }

  const onComplete = async () => {
    try {
      await storeInDB(min, max);
    } catch (err) {
      alert('Something went wrong. Please try again later');
      return;
    }
    props.onCompleteBudget(min, max);
  }

  return (
    <div>
      <OnboardingStepTitle>
        Budget Range
      </OnboardingStepTitle>
      <OnboardingStepSubtitle>
        Let us know your budget range so we can help create your perfect design.
      </OnboardingStepSubtitle>
      <br />
      <br />
      <div className={classes.minMaxInputs}>
        <TextField className={classes.textField} variant="outlined" onChange={onMinChange} error={!validMin} helperText={() => getHelperText('min')} label="Min" defaultValue={min} />
        <TextField className={classes.textField} variant="outlined" onChange={onMaxChange} error={!validMax} helperText={() => getHelperText('max')} label="Max" defaultValue={max} />
      </div>
      <br />
      <br />
      <OnboardingStepNavBtns
        canGoNext={canGoNext()}
        handleNext={onComplete}
        canGoBack={false}
      />
    </div>
  )

}
