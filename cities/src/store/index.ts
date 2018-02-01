import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';
import { initialState } from './reducers/game';

const store: Store<any> = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(reduxThunk)),
);

export default store;
