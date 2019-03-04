export function currentUserReducer(state='', action) {
  switch(action.type) {
    case 'UPDATE_USER':
      return action.username;
    default:
      return state;
  }
}