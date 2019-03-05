import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLoading } from '../../actions';
import ChatBox from '../ChatBox/ChatBox';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import PropTypes from 'prop-types';

export class App extends Component {

  componentDidMount = () => {
    this.props.history.push('/login');
    this.props.setLoading(false);
  }

  render() {
    return (
      <div className="App">
        <Header />
        {this.props.isLoading ? (
          <Loader />
        ) : (
            <div className="app-items">
              <Route path='/' component={ChatBox} />
            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

App.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  setLoading: PropTypes.func,
  isLoading: PropTypes.bool
}