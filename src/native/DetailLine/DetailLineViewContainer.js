import { connect } from 'react-redux';
import DetailLineView from './DetailLineView';

import {
  fetchInfoLine,
  saveFavorite,
  getFavorites,
  deleteFavorite,
  addFavorite,
} from '../../modules/Bus/actions';

export default connect(
  state => ({
    infoLine: state.bus.infoLine,
    saveFavorite: state.bus.saveFavorite,
    listFavorites: state.bus.listFavorites,
  }), {
    fetchInfoLine,
    saveFavorite,
    getFavorites,
    deleteFavorite,
    addFavorite,
  },
)(DetailLineView);
