import { combineReducers } from 'redux'
import authReducer from './authReducer'
import datingReducer from './datingReducer';
import messageReducer from './messageReducer';
import adminReducer from './adminReducer';

export default combineReducers({
   authReducer: authReducer,
   datingReducer: datingReducer,
   messageReducer: messageReducer,
   adminReducer:adminReducer
});