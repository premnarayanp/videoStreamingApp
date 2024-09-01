import authReducer from './authReducer';
import roomReducer from './roomReducer';
import socketReducer from './socketReducer'
import friendReducer from './friendReducer'
import { combineReducers } from 'redux';

//---------used predefined redux combined reducers--------
export default combineReducers({
  authReducer,
  roomReducer,
  socketReducer,
  friendReducer
});



