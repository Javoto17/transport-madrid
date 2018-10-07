import { connect } from 'react-redux';
import HomeView from './HomeView';

import { fetchListLines } from '../../modules/Bus/actions';

export default connect(
  state => ({
    listLines: state.bus.listLines,
    isLoading: state.bus.isLoading,
  }), {
    fetchListLines,
  },
)(HomeView);
