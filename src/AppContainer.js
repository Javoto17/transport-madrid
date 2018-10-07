import { connect } from 'react-redux';
import AppView from './AppView';

import {
  loadFavorites,
} from './modules/Bus/actions';

export default connect(
  state => ({
    listFavorites: state.bus.listFavorites,
  }), {
    loadFavorites,
  },
)(AppView);
