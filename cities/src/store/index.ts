import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';
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

const sagaMiddleware = createSagaMiddleware();
const store: Store<StoreModel> = createStore(
  rootReducer,
  {
    game: initialGameState,
    helpers: initialHelpersState,
  },
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(rootSaga);

export default store;
