import React from 'react';
import { compose } from 'redux';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: '100%',
    color: '#48494a',
    textShadow: '2px 2px 2px #658c91'
  },
  title: {
    fontFamily: 'Sacramento',
    marginTop: 25
  }
};

export const Header = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography className={classes.title} component="h2" variant="h1" align="center" gutterBottom>
      chattle
      <img src="https://i.imgur.com/XVCBZ72.png" className="heart-icon" alt="heart"></img>
      </Typography>
    </div>
  )
}

export default compose(withStyles(styles))(Header);