// npm packages
import {
  put,
  call,
  takeLatest,
  takeEvery,
  select,
} from 'redux-saga/effects';
import * as actions from './actions';

// actionTypes
import * as t from './actionTypes';

// api
import * as api from './api';

const getListFavorites = state => state.bus.listFavorites;

function* fetchListLines() {
  try {
    const response = yield call(api.getListLines);
    yield put(actions.fetchListLinesSuccess(response.data));
  } catch (e) {
    console.error(e);
  }
}

function* fetchInfoLine({
  payload,
}) {
  try {
    const response = yield call(api.getRoutesLine, payload);

    yield put(actions.getFavorites());

    console.log(response);

    yield put(actions.fetchInfoLineSuccess(response.data));
  } catch (e) {
    console.error(e);
  }
}

function* fetchDirectionLine({
  payload,
}) {
  try {
    const response = yield call(api.getDirectionLine, payload);
    yield put(actions.fetchDirectionLineSuccess(response.data));
  } catch (e) {
    console.error(e);
  }
}

function* saveFavorites() {
  try {
    const listFavorites = yield select(getListFavorites);
    const response = yield call(api.saveFavorites, listFavorites);
    yield put(actions.saveFavoriteSuccess(response));
  } catch (e) {
    console.error(e);
  }
}

function* loadFavorites() {
  try {
    const response = yield call(api.getFavorites);
    if (response) {
      yield put(actions.getFavoriteSuccess(response));
    }
  } catch (e) {
    console.error(e);
  }
}

function* fetchBusStop({
  payload,
}) {
  try {
    const response = yield call(api.fetchBusStop, payload);
    if (response) {
      yield put(actions.fetchBusStopSuccess(response.data));
      console.log(response);
    }
  } catch (e) {
    console.error(e);
  }
}


export function* watchFetchListLines() {
  yield takeLatest(t.FETCH_LIST_LINES, fetchListLines);
}
export function* watchFetchInfoLine() {
  yield takeLatest(t.FETCH_INFO_LINE, fetchInfoLine);
}
export function* watchFetchDirectionLine() {
  yield takeLatest(t.FETCH_DIRECTION_LINE, fetchDirectionLine);
}
export function* watchFetchBusStop() {
  yield takeLatest(t.FETCH_BUS_STOP, fetchBusStop);
}
export function* watchSaveFavorite() {
  yield takeLatest(t.ADD_FAVORITE, saveFavorites);
  yield takeLatest(t.DELETE_FAVORITE, saveFavorites);
}

export function* watchLoadFavorites() {
  yield takeEvery(t.LOAD_FAVORITES, loadFavorites);
}
