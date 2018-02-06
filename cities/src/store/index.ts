import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';
import { StateModel } from './stateModel';
import { initialState as initialGameState } from './reducers/game';
import {
  initialState as initialHelpersState,
  HelpersModel,
} from './reducers/helpers';

export interface StoreModel {
  game: StateModel;
  helpers: HelpersModel;
}

const store: Store<StoreModel> = createStore(
  rootReducer,
  {
    game: initialGameState,
    helpers: initialHelpersState,
  },
  composeWithDevTools(applyMiddleware(reduxThunk)),
);

export default store;
