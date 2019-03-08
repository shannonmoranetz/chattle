import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setLoading } from '../../actions';
import ChatBox from '../ChatBox/ChatBox';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
  root: {
    // display: 'flex',
    // flexDirection: 'column'
    // width: `calc(100% - ${240}px)`,
    // marginLeft: 240,
    // marginTop: 64
  },
  // login: {
  //   marginTop: 0
  // }

  // stickToBottom: {
  //   width: '100%',
  //   position: 'fixed',
  //   bottom: 0,
  //   height: 20
  // }
};

export class App extends Component {

  componentDidMount = () => {
    let { history, setLoading } = this.props;
    history.push('/login');
    setLoading(false);
  }

  render() {
    let { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.props.isLoading ? (
          <Loader />
        ) : (
            // <div className={classes.root}>
            <Dialog open={true}>

              <Route path='/' component={ChatBox} />
            </Dialog>
            // </div>
          )}
        {/* <AppBar position="static" color="primary" className={classes.stickToBottom}>
          <Toolbar/>
        </AppBar> */}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  isLoading: state.isLoading
})

export const mapDispatchToProps = (dispatch) => ({
  setLoading: (isLoading) => dispatch(setLoading(isLoading))
})

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(App);

App.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  setLoading: PropTypes.func,
  isLoading: PropTypes.bool
}