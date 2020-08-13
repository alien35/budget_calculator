import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ImageConstants from '../../constants/Image.constants';
import ImageComponent from '../../Shared/Image.component';

const useStyles = makeStyles((theme) => ({
  selected: {
    flexGrow: 1,
    border: '3px solid green'
  },
  notSelected: {
    flexGrow: 1,
    border: '3px solid white'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

export default function OnboardingChecklistStepContentItem(props) {
  const classes = useStyles();

  const getCardClass = () => {
    return props.isSelected ? classes.selected : classes.notSelected
  }

  return (
    <Grid item xs={12} sm={6}>
      <Card onClick={props.onClick} className={getCardClass()}>
        <CardActionArea>
          <ImageComponent image={props.item.image()} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.item.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Price Range: {props.item.prettyPriceRange()}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button onClick={props.onClick} size="small" color="secondary">
            {props.isSelected ? 'Remove from my list' : 'Add to my list'}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}