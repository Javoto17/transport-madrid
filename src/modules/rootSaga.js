import { all, spawn } from 'redux-saga/effects';

import {
  watchFetchListLines,
  watchFetchInfoLine,
  watchFetchDirectionLine,
  watchSaveFavorite,
  watchLoadFavorites,
  watchFetchBusStop,
} from './Bus/sagas';

export default function* rootSaga() {
  yield all([
    spawn(watchFetchListLines),
    spawn(watchFetchInfoLine),
    spawn(watchFetchDirectionLine),
    spawn(watchSaveFavorite),
    spawn(watchLoadFavorites),
    spawn(watchFetchBusStop),
    spawn(watchFetchBusStop),
  ]);
}
