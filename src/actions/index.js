export const resetMessages = messages => ({
  type: 'RESET_MESSAGES',
  messages
});

export const addMessage = message => ({
  type: 'ADD_MESSAGE',
  message
});

export const sortRooms = rooms => ({
  type: 'SORT_ROOMS',
  rooms
});