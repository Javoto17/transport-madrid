import { connect } from 'react-redux';
import HomeView from './HomeView';

import { fetchListLines, filterLinesByCriterial } from '../../modules/Bus/actions';

export default connect(
  state => ({
    listLinesFiltered: state.bus.listLinesFiltered,
    isLoading: state.bus.isLoading,
  }), {
    fetchListLines,
    filterLinesByCriterial,
  },
)(HomeView);
