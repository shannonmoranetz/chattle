import { combineReducers } from 'redux';
import { roomsReducer } from './roomsReducer';
import { currentRoomReducer } from './currentRoomReducer';
import { currentUserReducer } from './currentUserReducer';
import { isLoadingReducer } from './isLoadingReducer';
import { errorReducer } from './errorReducer';
import { avatarReducer } from './avatarReducer';

const rootReducer = combineReducers({
  rooms: roomsReducer,
  currentRoomId: currentRoomReducer,
  currentUser: currentUserReducer,
  isLoading: isLoadingReducer,
  error: errorReducer,
  avatar: avatarReducer
});

export default rootReducer;