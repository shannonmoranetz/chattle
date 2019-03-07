import React from 'react';
import { compose } from 'redux';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: '100%',
    color: '#48494a',
    textShadow: '2px 2px 2px #658c91'
  }
};

export const Header = (props) => {
  const { classes } = props;
  return (
    <div className="Header" className={classes.root}>
      <Typography component="h2" variant="h1" align="center" gutterBottom>
      chattle
      </Typography>
    </div>
  )
}

export default compose(withStyles(styles))(Header);