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

export const updateCurrentRoom = roomId => ({
  type: 'UPDATE_ROOM',
  roomId
});

export const updateCurrentUser = username => ({
  type: 'UPDATE_USER',
  username
});