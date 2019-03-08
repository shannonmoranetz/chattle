import React from 'react';
import { compose } from 'redux';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Hidden } from '@material-ui/core';

const styles = {
  root: {
    width: '100%',
    color: '#48494a',
    textShadow: '2px 2px 2px #658c91'
  },
  title: {
    fontFamily: 'Sacramento',
    marginTop: 25,
  },
  subtitle: {
    fontFamily: 'Sacramento',
    marginTop: 30,
  }
};

export const Header = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid justify="space-between" container>
        <Grid item xs={8}>
          <Typography className={classes.title} variant="h1" align="center">
            chattle
            <img src="https://i.imgur.com/XVCBZ72.png" className="heart-icon" alt="heart"></img>
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default compose(withStyles(styles))(Header);