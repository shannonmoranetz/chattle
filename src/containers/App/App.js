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
import UserForm from '../UserForm/UserForm';


const styles = (theme) => ({
  root: {
    width: `calc(100% - ${200}px)`,
    marginLeft: 200,
  },
});

export class App extends Component {

  componentDidMount = () => {
    this.props.setLoading(false);
  }

  render() {
    let { classes, isLoading } = this.props;
    return (
      <div className={classes.root} id="App">
        {isLoading ? (
          <Loader />
        ) : (
          <ChatBox />
        )}
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