import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ImageComponent from '../Shared/Image.component';
import ImageConstants from '../constants/Image.constants';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    logo: {
      maxHeight: '3rem'
    }
  }),
);

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <ImageComponent className={classes.logo} image={ImageConstants.LOGO} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
