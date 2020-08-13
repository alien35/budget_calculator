import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
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