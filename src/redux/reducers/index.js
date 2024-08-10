import {combineReducers} from 'redux';
import auth from './auth';
import types from '../types';
import appSettings from './appSettings';

const appReducer = combineReducers({
  auth,
  appSettings,
});

const rootReducer = (state, action) => {
  if (action.type == types.CLEAR_REDUX_STATE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
