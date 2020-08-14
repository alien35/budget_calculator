import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  message: {
    color: 'blue',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left'
  },
  paper: {
    padding: theme.spacing(3)
  },
  icon: {
    marginRight: theme.spacing(2)
  }
}));

export default function OnboardingStepChecklistAlert(props) {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h6" component="h1" className={classes.message}>
          <InfoIcon className={classes.icon} /> {props.children}
        </Typography>
      </Paper>
      <br />
      <br />
    </>
  )
}
