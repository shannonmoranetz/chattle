export function currentRoomReducer(state=null, action) {
  switch(action.type) {
    case 'UPDATE_ROOM':
      return action.roomId;
    default:
      return state;
  }
}