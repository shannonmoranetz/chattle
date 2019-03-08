import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setLoading } from '../../actions';
import ChatBox from '../ChatBox/ChatBox';
import Loader from '../../components/Loader/Loader';
import PropTypes from 'prop-types';

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