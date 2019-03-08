import React from 'react';
import { compose } from 'redux';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Hidden } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

const styles = {
  root: {
    width: '100%',
  },
  title: {
    fontFamily: 'Sacramento',
    marginTop: 25,
    textShadow: '2px 2px 2px #658c91'
  },
  subtitle: {
    fontFamily: 'Sacramento',
    marginLeft: 200,
    fontSize: 30
  }
};

export const Header = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
          <Typography className={classes.title} variant="h1" align="center">
            Chattle <Icon fontSize="large">favorite_border</Icon>
          </Typography>
          <Typography variant="subtitle1" align="center" className={classes.subtitle}>Chat with your friends!</Typography>
    </div>
  )
}

export default compose(withStyles(styles))(Header);