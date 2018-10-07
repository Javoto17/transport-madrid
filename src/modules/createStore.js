import {
  createStore,
  applyMiddleware,
} from 'redux';
import {
  composeWithDevTools,
} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
// reducer
import appReducer from './rootReducer';
import rootSaga from './rootSaga';
// rootSaga
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const rootReducer = (state, action) => (
  appReducer(state, action)
);

export default (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
  // run the saga
  sagaMiddleware.run(rootSaga);

  return store;
};
