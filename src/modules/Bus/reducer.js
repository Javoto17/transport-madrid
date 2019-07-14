import * as t from './actionTypes';

const initialState = {
  listLines: {
    data: [],
  },
  isLogin: false,
  listLinesFiltered: [],
  infoLine: {
    stops: [],
  },
  directionLine: null,
  saveFavorite: false,
  listFavorites: [],
  infoStop: {
    detail: {},
    times: [],
  },
  isLoading: false,
  loadingArrives: false,
  detailStop: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
  case t.FETCH_LIST_LINES:
    return {
      ...state,
      listLines: {
        data: [],
      },
    };
  case t.FETCH_LIST_LINES_SUCCESS:
    return {
      ...state,
      listLines: {
        ...action.payload,
        data: action.payload.data,
      },
      listLinesFiltered: action.payload.data,
      isLoading: true,
    };
  case t.FILTER_LINES_BY_CRITERIAL: {
    const { criterial } = action.payload;

    return {
      ...state,
      listLinesFiltered:
          !!criterial && !!state.listLines.data
            ? state.listLines.data.filter(el => (
              el.nameA
                .toLowerCase()
                .trim()
                .includes(criterial.toLowerCase())
                  || el.nameA
                    .toLowerCase()
                    .trim()
                    .includes(criterial.toLowerCase())
                  || el.label
                    .toLowerCase()
                    .trim()
                    .includes(criterial.toLowerCase())
            ))
            : state.listLines.data,
      isLoading: true,
    };
  }
  case t.FETCH_INFO_LINE:
    return {
      ...state,
      infoLine: {
        stops: [],
      },
    };
  case t.FETCH_INFO_LINE_SUCCESS:
    return {
      ...state,
      infoLine: {
        ...action.payload.data[0],
        stops: Array.isArray(action.payload.data[0].stops)
          ? action.payload.data[0].stops.map(el => Object.assign({}, el, {
            isFavorite: state.listFavorites.some(
              favorite => favorite.stop === el.stop,
            ),
          }))
          : [],
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
      directionLine: action.payload.data[0],
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
        stops: state.infoLine.stops.map(el => (el.stop === action.payload.stop
          ? { ...el, isFavorite: !el.isFavorite }
          : el)),
      },
      detailStop: { ...action.payload, isFavorite: true },
    };
  case t.DELETE_FAVORITE:
    return {
      ...state,
      listFavorites: [
        ...state.listFavorites.filter(
          item => item.stop !== action.payload.detailStop.stop,
        ),
      ],
      infoLine: {
        ...state.infoLine,
        stops: state.infoLine.stops.map(el => (el.stop === action.payload.detailStop.stop
          ? { ...el, isFavorite: !el.isFavorite }
          : el)),
      },
      detailStop: { ...action.payload.detailStop, isFavorite: false },
    };
  case t.FETCH_BUS_STOP_TIMES:
    return {
      ...state,
      infoStop: state.infoStop,
      loadingArrives: true,
    };
  case t.FETCH_BUS_STOP_TIMES_SUCCESS: {
    return {
      ...state,
      infoStop: {
        ...state.infoStop,
        times:
            action.payload.data[0].Arrive && action.payload.data[0].Arrive
              ? action.payload.data[0].Arrive
              : [],
      },
      loadingArrives: false,
    };
  }
  case t.FETCH_BUS_STOP:
    return {
      ...state,
      infoStop: state.infoStop,
      isLoading: false,
      loadingArrives: true,
    };
  case t.FETCH_BUS_STOP_SUCCESS: {
    return {
      ...state,
      infoStop: {
        ...state.infoStop,
        detail: action.payload.detail.data,
      },
      isLoading: true,
      // loadingArrives: true,
    };
  }
  case t.FETCH_BUS_STOP_ERROR: {
    return {
      ...state,
      infoStop: state.infoStop,
      isLoading: true,
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
  case t.LOGIN_EMT:
    return {
      ...state,
      isLogin: false,
    };
  case t.LOGIN_EMT_SUCCESS:
    return {
      ...state,
      isLogin: true,
    };
  default:
    return state;
  }
};
