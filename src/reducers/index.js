import { combineReducers } from 'redux';
import { messagesReducer } from './messagesReducer';
import { roomsReducer } from './roomsReducer';
import { currentRoomReducer } from './currentRoomReducer';
import { currentUserReducer } from './currentUserReducer';
import { isLoadingReducer } from './isLoadingReducer';
import { errorReducer } from './errorReducer';

const rootReducer = combineReducers({
  messages: messagesReducer,
  rooms: roomsReducer,
  currentRoomId: currentRoomReducer,
  currentUser: currentUserReducer,
  isLoading: isLoadingReducer,
  error: errorReducer
});

export default rootReducer;