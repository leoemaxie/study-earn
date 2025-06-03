import {io} from 'socket.io-client';
import constants from '@/redux/constants';
import store from '@/redux/store';

const {BASE_URL} = constants;
const PATH = '/api/v1/chat';

export const socket = io(`${BASE_URL}${PATH}`, {
  transports: ['websocket'],
  jsonp: false,
  auth: {
    token: store.getState().auth.accessToken,
  },
});
