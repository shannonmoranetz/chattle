import { combineReducers } from 'redux';
import { messagesReducer } from './messagesReducer';
import { roomsReducer } from './roomsReducer';
import { currentRoomReducer } from './currentRoomReducer';

const rootReducer = combineReducers({
  messages: messagesReducer,
  rooms: roomsReducer,
  currentRoomId: currentRoomReducer
});

export default rootReducer;