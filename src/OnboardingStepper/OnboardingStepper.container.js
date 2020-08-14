import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  }
}));

export default function OnboardingStepper(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Stepper nonLinear activeStep={props.activeStep}>
        {props.steps.map((label) => (
          <Step key={label}>
            <StepButton>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}