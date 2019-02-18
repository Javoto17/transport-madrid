import * as t from './actionTypes';

export const fetchListLines = () => ({
  type: t.FETCH_LIST_LINES,
});

export const fetchListLinesSuccess = payload => ({
  type: t.FETCH_LIST_LINES_SUCCESS,
  payload,
});

export const fetchInfoLine = (line, directionLine) => ({
  type: t.FETCH_INFO_LINE,
  payload: {
    line,
    directionLine,
  },
});

export const fetchInfoLineSuccess = payload => ({
  type: t.FETCH_INFO_LINE_SUCCESS,
  payload,
});

export const fetchDirectionLine = line => ({
  type: t.FETCH_DIRECTION_LINE,
  payload: {
    line,
  },
});

export const fetchDirectionLineSuccess = payload => ({
  type: t.FETCH_DIRECTION_LINE_SUCCESS,
  payload,
});

export const saveFavorite = stopFavorites => ({
  type: t.SAVE_FAVORITE,
  payload: {
    stopFavorites,
  },
});

export const getFavorites = payload => ({
  type: t.GET_FAVORITES,
  payload,
});

export const saveFavoriteSuccess = payload => ({
  type: t.SAVE_FAVORITE_SUCCESS,
  payload,
});

export const getFavoriteSuccess = payload => ({
  type: t.GET_FAVORITES_SUCCESS,
  payload,
});

export const fetchBusStop = idStop => ({
  type: t.FETCH_BUS_STOP,
  payload: {
    idStop,
  },
});
export const fetchBusStopSuccess = payload => ({
  type: t.FETCH_BUS_STOP_SUCCESS,
  payload,
});


export const addFavorite = item => ({
  type: t.ADD_FAVORITE,
  payload: {
    ...item,
  },
});

export const deleteFavorite = detailStop => ({
  type: t.DELETE_FAVORITE,
  payload: {
    detailStop,
  },
});

export const addFavoriteSuccess = payload => ({
  type: t.ADD_FAVORITE_SUCCESS,
  payload,
});

export const deleteFavoriteSuccess = payload => ({
  type: t.DELETE_FAVORITE_SUCCESS,
  payload,
});

export const loadFavorites = payload => ({
  type: t.LOAD_FAVORITES,
  payload,
});

export const loadFavoritesSuccess = payload => ({
  type: t.LOAD_FAVORITES_SUCCESS,
  payload,
});

export const filterLinesByCriterial = criterial => ({
  type: t.FILTER_LINES_BY_CRITERIAL,
  payload: {
    criterial,
  },
});
