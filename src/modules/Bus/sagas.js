// npm packages
import {
  put,
  call,
  takeLatest,
  takeEvery,
  select,
  all,
} from 'redux-saga/effects';
import * as actions from './actions';
import * as t from './actionTypes';
import * as api from './api';

import NavigationService from '../../AppNavigatorService';

const getListFavorites = state => state.bus.listFavorites;
const getIsLogin = state => state.bus.isLogin;

function* fetchListLines() {
  try {
    const isLogin = yield select(getIsLogin);
    if (isLogin) {
      const response = yield call(api.getListLines);
      yield put(actions.fetchListLinesSuccess(response.data));
    }
  } catch (e) {
    console.error(e);
  }
}

function* fetchInfoLine({ payload }) {
  try {
    const response = yield call(api.getRoutesLine, payload);
    yield put(actions.getFavorites());
    yield put(actions.fetchInfoLineSuccess(response.data));
  } catch (e) {
    // console.error(e);
  }
}

function* fetchDirectionLine({ payload }) {
  try {
    const response = yield call(api.getDirectionLine, payload);
    yield put(actions.fetchDirectionLineSuccess(response.data));
  } catch (e) {
    // console.error(e);
  }
}

function* saveFavorites() {
  try {
    const listFavorites = yield select(getListFavorites);
    const response = yield call(api.saveFavorites, listFavorites);
    yield put(actions.saveFavoriteSuccess(response));
  } catch (e) {
    // console.error(e);
  }
}

function* loadFavorites() {
  try {
    const response = yield call(api.getFavorites);
    if (response) {
      yield put(actions.getFavoriteSuccess(response));
    }
  } catch (e) {
    // console.error(e);
  }
}

function* setToken() {
  try {
    const response = yield all([call(api.clearToken), call(api.loginEmt)]);
    console.log(response);
    const { accessToken } = response[1].data.data[0];
    console.log(accessToken);
    if (accessToken) {
      yield all([
        call(api.saveToken, accessToken),
        put(actions.loginEmtSuccess()),
        put(actions.fetchListLines()),
      ]);
    }
  } catch (e) {
    console.log('error', e);
  }
}

function* fetchBusStopInfo({ payload }) {
  try {
    const [detail] = yield all([call(api.fetchBusStop, payload)]);
    const listFavorites = yield select(getListFavorites);
    if (detail) {
      yield put(
        actions.fetchBusStopSuccess({
          detail: detail.data,
        }),
      );
      const busStop = detail.data.data[0].stops[0];
      NavigationService.navigate('DetailStop', {
        detailStop: {
          ...busStop,
          isFavorite: !!listFavorites.find(el => el.stop === busStop.stop),
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
}

function* fetchBusStopTimes({ payload }) {
  try {
    const response = yield call(api.fetchBusStopTimes, payload);
    yield put(actions.fetchBusStopTimesSuccess(response.data));
  } catch (e) {
    console.log(e);
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
  yield takeLatest(t.FETCH_BUS_STOP, fetchBusStopInfo);
}

export function* watchFetchBusStopTimes() {
  yield takeLatest(t.FETCH_BUS_STOP_TIMES, fetchBusStopTimes);
}

export function* watchSaveFavorite() {
  yield takeLatest(t.ADD_FAVORITE, saveFavorites);
  yield takeLatest(t.DELETE_FAVORITE, saveFavorites);
}

export function* watchLoadFavorites() {
  yield takeLatest(t.LOAD_FAVORITES, loadFavorites);
}

export function* watchLogin() {
  yield takeEvery(t.LOGIN_EMT, setToken);
}
