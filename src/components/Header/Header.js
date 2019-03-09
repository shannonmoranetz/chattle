import React from 'react';
import { compose } from 'redux';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

const styles = {
  root: {
    width: '100%',
  },
  title: {
    fontFamily: 'Sacramento',
    marginTop: 25,
    textShadow: '4px 4px 4px white'
  },
  subtitle: {
    fontFamily: 'Sacramento',
    marginLeft: 200,
    fontSize: 30
  },
  icon: {
    fontSize: 68
  }
};

export const Header = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h1" align="center">
        Chattle <Icon className={classes.icon}>favorite_border</Icon>
      </Typography>
      <Typography variant="subtitle1" align="center" className={classes.subtitle}>Chat with your friends!</Typography>
    </div>
  )
}

export default compose(withStyles(styles))(Header);