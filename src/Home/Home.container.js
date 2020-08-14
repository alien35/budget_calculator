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
import { withRouter } from 'react-router-dom';
import ChecklistItemService from '../Services/ChecklistItem.service';

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

const getActiveStep = (currentStage) => {
  const allSteps = StepsService.getSteps();
  return allSteps.map((step) => step.path).indexOf(currentStage);
}

function HomeContainer(props) {
  const classes = useStyles();

  const steps = StepsService.getSteps().map((step) => step.name);


  const [ user, setUser ] = React.useState({
    finishedFetching: false,
    result: null
  });

  const [ activeStep, setActiveStep ] = React.useState(getActiveStep(props.history.location.pathname));

  const [ items, setItems ] = React.useState({
    finishedFetching: false,
    result: null
  });

  React.useEffect(() => {
    if (!user.finishedFetching) {
      fetchUser();
    }
    if (!items.finishedFetching) {
      fetchItems();
    }
    setActiveStep(getActiveStep(props.history.location.pathname));
  }, [props.history.location.pathname])

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

  const fetchItems = async () => {
    let result;
    try {
      result = await ApiService.get({
        endpoint: `${endpointsConstants.BASE_URL}/items`
      });
    } catch (err) {
      setItems({
        finishedFetching: true,
        result: null
      });
      return alert(err.error);
    }
    const deserializedResults = result.data.data.map((apiResult) => ChecklistItemService.deserialize(apiResult));
    setItems({
      finishedFetching: true,
      result: deserializedResults
    })
  
  }


  if (!user.finishedFetching) {
    return (
      <Loading />
    )
  }

  if (!items.finishedFetching) {
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
            items={items.result}
            steps={steps}
          />
        </div>
      </div>
      
    </div>
  )
}

export default withRouter(HomeContainer);