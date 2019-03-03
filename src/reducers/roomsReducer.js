export function roomsReducer(state=[], action) {
  switch(action.type) {
    case 'SORT_ROOMS':
      const sortedRooms = [...action.rooms].sort((a, b) => a.id - b.id);
      return sortedRooms;
    default:
      return state;
  }
}