import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';

import {
  BusStopContainer,
  BusStopContent,
  BusStopText,
  BusStopNumber,
  BusStopContentNumber,
  SubTextBusStop,
} from './StopRow.style';
import { convertLineNumber } from '../../../utils/Stops';

class StopRow extends PureComponent {
  // constructor(props) {
  //   super(props);

  // }

  actionFavorite = (item) => {
    const { addFavorite, deleteFavorite, isFavorite } = this.props;

    if (isFavorite) {
      deleteFavorite(item);
    } else {
      addFavorite(item);
    }
  };

  render() {
    const {
      item, index, navigation, isFavorite,
    } = this.props;

    const lines = Array.isArray(item.dataLine)
      ? item.dataLine.map(el => convertLineNumber(el))
      : convertLineNumber(item.dataLine);

    return (
      <BusStopContainer
        key={`line-${item.stop}-${item.pmv}`}
        isEven={index % 2}
        onPress={() => navigation.navigate('DetailStop', { detailStop: item })}
      >
        <BusStopContentNumber>
          <BusStopNumber>{item.stop}</BusStopNumber>
        </BusStopContentNumber>
        <BusStopContent>
          <BusStopText numberOfLines={1}>{`${item.name}`}</BusStopText>
          <SubTextBusStop numberOfLines={1}>
            {item.postalAddress}
          </SubTextBusStop>
          <SubTextBusStop numberOfLines={2}>
            {Array.isArray(lines)
              ? `Líneas: ${lines.join(' ')}`
              : `Línea: ${lines}`}
          </SubTextBusStop>
        </BusStopContent>
        <BusStopContentNumber>
          <TouchableOpacity onPress={() => this.actionFavorite(item)}>
            <FontAwesome
              name="star"
              style={{ color: isFavorite ? '#027bff' : '#99a2b4' }}
              size={20}
            />
          </TouchableOpacity>
        </BusStopContentNumber>
      </BusStopContainer>
    );
  }
}

StopRow.defaultProps = {
  item: {},
  index: 0,
  isFavorite: false,
  navigation: this.navigation,
  addFavorite: () => {},
  deleteFavorite: () => {},
};

StopRow.propTypes = {
  index: PropTypes.number,
  item: PropTypes.shape({
    stop: PropTypes.string,
    name: PropTypes.string,
    pmv: PropTypes.string,
    postalAddress: PropTypes.string,
    isFavorite: PropTypes.bool,
    dataLine: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.shape({ line: PropTypes.string })),
      PropTypes.string,
    ]),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  isFavorite: PropTypes.bool,
  addFavorite: PropTypes.func,
  deleteFavorite: PropTypes.func,
};

export default StopRow;
