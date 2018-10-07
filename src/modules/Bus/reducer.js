import * as t from './actionTypes';


const initialState = {
  listLines: {
    resultValues: [],
  },
  infoLine: {
    stop: [],
  },
  directionLine: null,
  saveFavorite: false,
  listFavorites: [],
  infoStop: null,
  isLoading: false,
  loadingArrives: false,
  detailStop: {
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
  case t.FETCH_LIST_LINES:
    return {
      ...state,
      listLines: {
        resultValues: [],
      },
    };
  case t.FETCH_LIST_LINES_SUCCESS:
    return {
      ...state,
      listLines: {
        ...action.payload,
        resultValues: action.payload.resultValues,
      },
      isLoading: true,
    };
  case t.FETCH_INFO_LINE:
    return {
      ...state,
      infoLine: {
        stop: [],
      },
    };
  case t.FETCH_INFO_LINE_SUCCESS:
    return {
      ...state,
      infoLine: {
        ...action.payload,
        stop: action.payload.stop.map(el => Object.assign({}, el, { isFavorite: state.listFavorites.some(favorite => favorite.stopId === el.stopId) })),
      },
    };
  case t.FETCH_DIRECTION_LINE:
    return {
      ...state,
      directionLine: null,
    };
  case t.FETCH_DIRECTION_LINE_SUCCESS:
    return {
      ...state,
      directionLine: action.payload,
    };
  case t.SAVE_FAVORITE:
    return {
      ...state,
      saveFavorite: false,
    };
  case t.SAVE_FAVORITE_SUCCESS:
    return {
      ...state,
      saveFavorite: true,
    };
  case t.GET_FAVORITES:
    return {
      ...state,
      listFavorites: state.listFavorites,
    };
  case t.GET_FAVORITES_SUCCESS:
    return {
      ...state,
      listFavorites: state.listFavorites.concat(action.payload),
    };
  case t.ADD_FAVORITE:
    return {
      ...state,
      listFavorites: [
        ...state.listFavorites,
        { ...action.payload, isFavorite: true },
      ],
      infoLine: {
        ...state.infoLine,
        stop: state.infoLine.stop.map(el => (
          el.stopId === action.payload.stopId ? { ...el, isFavorite: !el.isFavorite } : el
        )),
      },
      detailStop: { ...action.payload, isFavorite: true },
    };
  case t.DELETE_FAVORITE:
    return {
      ...state,
      listFavorites: [
        ...state.listFavorites.filter(item => item.stopId !== action.payload.detailStop.stopId),
      ],
      infoLine: {
        ...state.infoLine,
        stop: state.infoLine.stop.map(el => (
          el.stopId === action.payload.detailStop.stopId ? { ...el, isFavorite: !el.isFavorite } : el
        )),
      },
      detailStop: { ...action.payload.detailStop, isFavorite: false },
    };
  case t.FETCH_BUS_STOP:
    return {
      ...state,
      infoStop: [],
      loadingArrives: true,
    };
  case t.FETCH_BUS_STOP_SUCCESS: {
    return {
      ...state,
      infoStop: action.payload.arrives && action.payload.arrives[0] ? action.payload.arrives : [],
      loadingArrives: false,
    };
  }
  case t.LOAD_FAVORITES:
    return {
      ...state,
      listFavorites: state.listFavorites,
    };
  case t.LOAD_FAVORITES_SUCCESS:
    return {
      ...state,
      listFavorites: action.payload,
    };
  default:
    return state;
  }
};
