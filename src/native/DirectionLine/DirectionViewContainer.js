import { connect } from 'react-redux';
import DirectionLineView from './DirectionLineView';

import { fetchDirectionLine } from '../../modules/Bus/actions';

export default connect(
  state => ({
    directionLine: state.bus.directionLine,
  }), {
    fetchDirectionLine,
  },
)(DirectionLineView);
