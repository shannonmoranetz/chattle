import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Chatkit from '@pusher/chatkit-client';

const devTools = composeWithDevTools();
const store = createStore(rootReducer, devTools);

// move us to a component so you can ref state for userId
const tokenProvider = new Chatkit.TokenProvider({
  url: "https://shannon-secret-auth.herokuapp.com/auth"
});
export const chatManager = new Chatkit.ChatManager({
  instanceLocator: "v1:us1:246b3612-b77d-450d-824f-85cf24e32654",
  userId: "shannon",
  tokenProvider: tokenProvider
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
document.getElementById('root'));

serviceWorker.unregister();
