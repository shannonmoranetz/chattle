import { combineReducers } from 'redux';
import { messagesReducer } from './messagesReducer';
import { roomsReducer } from './roomsReducer';
import { currentRoomReducer } from './currentRoomReducer';
import { currentUserReducer } from './currentUserReducer';

const rootReducer = combineReducers({
  messages: messagesReducer,
  rooms: roomsReducer,
  currentRoomId: currentRoomReducer,
  currentUser: currentUserReducer
});

export default rootReducer;