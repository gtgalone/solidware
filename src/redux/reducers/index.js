import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createArrayReducer, createNumberReducer } from '../../../shared/redux/modules/redux-rest-api';

const reducers = combineReducers({
  form: formReducer,
  people: createArrayReducer('people', { idKey: '_id' }),
  peopleRandom: createArrayReducer('peopleRandom', { idKey: '_id' }),
  peopleCount: createNumberReducer('peopleCount'),
});

export default reducers;
