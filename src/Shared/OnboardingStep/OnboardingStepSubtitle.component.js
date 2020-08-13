import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  text: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    maxWidth: '30rem',
    fontWeight: 300
  },
}));

export default function OnboardingStepTitle(props) {

  const classes = useStyles();

  return (
    <Typography color="textSecondary" variant="h6" component="h1" className={classes.text}>{props.children}</Typography>
  )
}
