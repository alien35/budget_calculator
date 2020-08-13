import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function OnboardingStepTitle(props) {

  const classes = useStyles();

  return (
    <Typography variant="h5" component="h1" className={classes.instructions}>{props.children}</Typography>
  )
}
