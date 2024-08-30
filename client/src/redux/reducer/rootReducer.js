import authReducer from './authReducer';
import friendReducer from './friendsReducer';
import { combineReducers } from 'redux';

//---------used predefined redux combined reducers--------
export default combineReducers({
  authReducer,
  friendReducer
});



