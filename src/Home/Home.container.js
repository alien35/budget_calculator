import React from 'react';
import Header from '../Header/Header.component';
import OnboardingStepper from '../OnboardingStepper/OnboardingStepper.container';
import OnboardingStepContent from '../OnboardingStepContent/OnboardingStepContent.component';
import { makeStyles } from '@material-ui/core/styles';
import StepsService from '../Services/Steps.service';

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
  },
}));

export default function HomeContainer(props) {

  const [ activeStep, setActiveStep ] = React.useState(0);
  const [ minMaxBudget, setMinMaxBudget] = React.useState([0, 695]); 

  const steps = StepsService.getSteps().map((step) => step.name);

  const classes = useStyles();

  const onCompleteBudget = (min, max) => {
    // Get the true min max. This would be
    // if user flipped around the numbers like 243, 2
    const _min = Math.min(min, max);
    const _max = Math.max(min, max);
    setMinMaxBudget([_min, _max])
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
            minMaxBudget={minMaxBudget}
            steps={steps}
            onCompleteBudget={onCompleteBudget}
          />
        </div>
      </div>
      
    </div>
  )
}
