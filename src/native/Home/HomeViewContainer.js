import { connect } from 'react-redux';
import HomeView from './HomeView';

import {
  fetchListLines,
  filterLinesByCriterial,
  fetchBusStop,
} from '../../modules/Bus/actions';

export default connect(
  state => ({
    listLinesFiltered: state.bus.listLinesFiltered,
    isLoading: state.bus.isLoading,
    isLogin: state.bus.isLogin,
  }),
  {
    fetchListLines,
    filterLinesByCriterial,
    fetchBusStop,
  },
)(HomeView);
