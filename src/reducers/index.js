import { combineReducers } from 'redux';
import { messagesReducer } from './messagesReducer';
import { roomsReducer } from './roomsReducer';

const rootReducer = combineReducers({
  messages: messagesReducer,
  rooms: roomsReducer
});

export default rootReducer;