import React from 'react';
import Header from '../Header/Header.component';
import OnboardingStepper from '../OnboardingStepper/OnboardingStepper.container';
import OnboardingStepContent from '../OnboardingStepContent/OnboardingStepContent.component';
import { makeStyles } from '@material-ui/core/styles';
import StepsService from '../Services/Steps.service';
import ApiService from '../Services/Api.service';
import UserService from '../Services/User.service';
import Loading from '../Shared/Loading.component';
import endpointsConstants from '../constants/endpoints.constants';

const useStyles = makeStyles((theme) => ({
  contentWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  content: {
    // Use "rem" in order to ensure
    // expected responsiveness on mobile devices
    maxWidth: '50rem'
  }
}));

export default function HomeContainer(props) {

  const [ user, setUser ] = React.useState({
    finishedFetching: false,
    result: null
  });
  const [ activeStep, setActiveStep ] = React.useState(0);

  React.useEffect(() => {
    fetchUser();
    
  }, [])

  const fetchUser = async () => {
    let result;
    try {
      result = await ApiService.get({
        endpoint: `${endpointsConstants.BASE_URL}/user`
      });
    } catch (err) {
      setUser({
        finishedFetching: true,
        result: null
      });
      return alert(err.error);
    }
    setUser({
      finishedFetching: true,
      result: UserService.deserialize(result.data.data)
    });
  }

  const steps = StepsService.getSteps().map((step) => step.name);

  const classes = useStyles();

  if (!user.finishedFetching) {
    return (
      <Loading />
    )
  }

  if (!user.result) {
    return (
      <Typography variant="h6" component="h1">No user found. Try logging out and in again.</Typography>
    )
  }

  return (
    <div>
      <Header />
      <br />
      <div className={classes.contentWrapper}>
        <div className={classes.content}>
          <OnboardingStepper
            steps={steps}
            setActiveStep={setActiveStep}
            activeStep={activeStep}
          />
          <OnboardingStepContent
            user={user.result}
            steps={steps}
          />
        </div>
      </div>
      
    </div>
  )
}
