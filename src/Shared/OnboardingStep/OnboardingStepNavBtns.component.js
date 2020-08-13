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
    props.handleBack();
    
  };

  const handleNext = () => {
    props.handleNext();
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
        Save & Continue
      </Button>
    </div>
  )

}

export default withRouter(OnboardingStepNavBtns);