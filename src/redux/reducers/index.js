import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
  LOAD_ACTION_CODE,
  CREATE_ACTION_CODE,
  UPDATE_ACTION_CODE,
  createPageReducer,
  createArrayReducer,
  createApiStatusReducer,
  createNumberReducer,
  createBooleanReducer,
  createStringReducer
} from '../../../shared/redux/modules/redux-rest-api';

const reducers = combineReducers({
  form: formReducer,
  people: createArrayReducer('people', { idKey: '_id' }),
});

export default reducers;
