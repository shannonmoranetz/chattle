import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const devTools = composeWithDevTools();
const store = createStore(rootReducer, devTools);

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})

ReactDOM.render(
  <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
  </Provider>,
document.getElementById('root'));

serviceWorker.unregister();
