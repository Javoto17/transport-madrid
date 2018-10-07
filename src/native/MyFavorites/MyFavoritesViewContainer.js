import { connect } from 'react-redux';
import MyFavoritesView from './MyFavoritesView';

import {
  fetchInfoLine,
  saveFavorite,
  getFavorites,
  deleteFavorite,
  addFavorite,
} from '../../modules/Bus/actions';

export default connect(
  state => ({
    listFavorites: state.bus.listFavorites,
  }), {
    fetchInfoLine,
    saveFavorite,
    getFavorites,
    deleteFavorite,
    addFavorite,
  },
)(MyFavoritesView);
