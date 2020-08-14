import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  text: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    maxWidth: '30rem',
  },
}));

const findItem = (id, items) => {
  return items.find((checklistItem) => checklistItem.id === id);
}

export default function OnboardingStepReviewItem(props) {

  const [ item ] = React.useState((findItem(props.id, props.items)))

  const classes = useStyles();

  return (
    <div>
      <Typography color="textSecondary" variant="h6" component="h1" className={classes.text}>
        {item.name} ({item.prettyPriceRange()})
      </Typography>
    </div>
  )
}
