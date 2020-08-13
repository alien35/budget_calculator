import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import OnboardingStepTitle from '../../Shared/OnboardingStep/OnboardingStepTitle.component';
import OnboardingStepSubtitle from '../../Shared/OnboardingStep/OnboardingStepSubtitle.component';
import TextField from '@material-ui/core/TextField';
import OnboardingStepNavBtns from '../../Shared/OnboardingStep/OnboardingStepNavBtns.component';
import * as firebase from 'firebase/app';
import CurrencyService from '../../Services/Currency.service';
import CurrencyInput from '../../Shared/CurrencyInput.component';
import ApiService from '../../Services/Api.service';
import endpointsConstants from '../../constants/endpoints.constants';
import UserService from '../../Services/User.service';
import UserBudget from '../../classes/UserBudget.class';

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

const MAX_ALLOWED = 100000000000;

export default function OnboardingBudgetStepContent(props) {

  const [ db ] = React.useState(firebase.firestore());
  const [ validMin, setValidMin ] = React.useState(true);
  const [ validMax, setValidMax ] = React.useState(true);
  const [ min, setMin ] = React.useState(props.user.budget.min);
  const [ max, setMax ] = React.useState(props.user.budget.max);
  
  const classes = useStyles();

  const onMinChange = React.useCallback(val => {
    setMin(val);
  }, []);

  const onMaxChange = React.useCallback(val => {
    setMax(val);
  }, []);

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
    try {
      props.user.budget = new UserBudget(min, max);
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
      await storeInDB(min, max);
    } catch (err) {
      console.log(err, 'err here')
      alert('Something went wrong. Please try again later');
      return;
    }
    props.onComplete();
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
        <CurrencyInput
          className={classes.textField}
          label="Min"
          max={MAX_ALLOWED}
          onValueChange={onMinChange}
          value={min}
        />
        <CurrencyInput
          className={classes.textField}
          label="Max"
          max={MAX_ALLOWED}
          onValueChange={onMaxChange}
          value={max}
        />
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
