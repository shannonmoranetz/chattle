export function avatarReducer(state='', action) {
  switch(action.type) {
    case 'SET_AVATAR':
      return action.avatar;
    default:
      return state;
  }
}