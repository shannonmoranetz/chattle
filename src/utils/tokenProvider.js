import Chatkit from '@pusher/chatkit-client';

export const tokenProvider = new Chatkit.TokenProvider({
  url: "https://chattle-auth.herokuapp.com/auth"
});