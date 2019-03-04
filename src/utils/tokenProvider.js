import Chatkit from '@pusher/chatkit-client';

export const tokenProvider = new Chatkit.TokenProvider({
  url: "https://shannon-secret-auth.herokuapp.com/auth"
});