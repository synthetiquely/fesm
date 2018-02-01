import { combineReducers, Reducer, Store } from 'redux';
import gameReducer from './game';

const rootReducer: Reducer<any> = combineReducers({
  game: gameReducer,
});

export default rootReducer;
