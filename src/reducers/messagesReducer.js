export function messagesReducer(state=[], action) {
  switch(action.type) {
    case 'RESET_MESSAGES':
      return [];
    case 'ADD_MESSAGE':
      return [...state, action.message];
    default:
      return state;
  }
}