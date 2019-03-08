import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center'
  },
  loadText: {
    marginTop: '20%',
    marginRight: '30%'
  }
}

export const Loader = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.loadText}>Loading...</Typography>
    </div>
  )
}

export default withStyles(styles)(Loader)