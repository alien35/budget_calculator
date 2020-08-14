import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OnboardingStepTitle from '../../Shared/OnboardingStep/OnboardingStepTitle.component';
import OnboardingStepSubtitle from '../../Shared/OnboardingStep/OnboardingStepSubtitle.component';
import OnboardingStepNavBtns from '../../Shared/OnboardingStep/OnboardingStepNavBtns.component';
import CurrencyInput from '../../Shared/CurrencyInput.component';
import ApiService from '../../Services/Api.service';
import endpointsConstants from '../../constants/endpoints.constants';
import UserService from '../../Services/User.service';
import UserBudget from '../../classes/UserBudget.class';
import Loading from '../../Shared/Loading.component';

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

  const [ min, setMin ] = React.useState(props.user.budget.min);
  const [ max, setMax ] = React.useState(props.user.budget.max);

  const [ isLoading, setIsLoading ] = React.useState(false);
  
  const classes = useStyles();

  const onMinChange = React.useCallback(val => {
    setMin(val);
  }, []);

  const onMaxChange = React.useCallback(val => {
    setMax(val);
  }, []);

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
    setIsLoading(true);
    try {
      await storeInDB(min, max);
    } catch (err) {
      console.log(err, 'err here')
      alert('Something went wrong. Please try again later');
      return;
    }
    props.onComplete();
    setIsLoading(false);
  }

  if (isLoading) {
    // We rendering this here to not obstruct the
    // UI events occuring in the background
    // so we can provide a smooth experience
    return <Loading />
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
        canGoNext={true}
        handleNext={onComplete}
        canGoBack={false}
      />
    </div>
  )

}
