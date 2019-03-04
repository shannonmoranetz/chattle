export function currentUserReducer(state='', action) {
  switch(action.type) {
    case 'UPDATE_USER':
      if (action.username !== state) {
        return action.username;
      } else {
        return state;
      }
    default:
      return state;
  }
}