import { connect } from 'react-redux';
import AppView from './AppView';

import {
  loadFavorites,
  loginEmt,
} from './modules/Bus/actions';

export default connect(
  state => ({
    listFavorites: state.bus.listFavorites,
  }), {
    loadFavorites,
    loginEmt,
  },
)(AppView);
