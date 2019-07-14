import { connect } from 'react-redux';
import DetailStopView from './DetailStopView';

import { fetchBusStopTimes, addFavorite, deleteFavorite } from '../../modules/Bus/actions';

export default connect(
  state => ({
    saveFavorite: state.bus.saveFavorite,
    listFavorites: state.bus.listFavorites,
    infoStop: state.bus.infoStop,
    detailStop: state.bus.detailStop,
    loadingArrives: state.bus.loadingArrives,
  }), {
    fetchBusStopTimes,
    addFavorite,
    deleteFavorite,
  },
)(DetailStopView);
