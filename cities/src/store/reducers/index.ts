import { combineReducers, Reducer, Store } from 'redux';
import gameReducer from './game';
import helpersReducer from './helpers';
import { StoreModel } from '../index';

const rootReducer: Reducer<StoreModel> = combineReducers({
  game: gameReducer,
  helpers: helpersReducer,
});

export default rootReducer;
