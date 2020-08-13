import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import StepsService from '../../Services/Steps.service';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around'
  }
}));

function OnboardingStepNavBtns(props) {

  const classes = useStyles();

  const handleBack = () => {
    switch (props.activeStep) {
      case 'checklist': {
        return props.history.push(StepsService.getSteps()[0].path);
      }
      case 'review': {
        return props.history.push(StepsService.getSteps()[1].path);
      }
    }
    
  };

  const handleNext = () => {
    props.handleNext();
    props.history.push(StepsService.getSteps()[1].path);
  }

  return (
    <div className={classes.root}>
      <Button disabled={!props.canGoBack} onClick={handleBack} className={classes.button}>
        Back
      </Button>
      <Button
        disabled={!props.canGoNext}
        variant="contained"
        color="secondary"
        onClick={handleNext}
        className={classes.button}
      >
        Next
      </Button>
    </div>
  )

}

export default withRouter(OnboardingStepNavBtns);