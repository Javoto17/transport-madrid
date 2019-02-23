import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import ActivityIndicator from '../components/ActivityIndicator/ActivityIndicator';
import StopRow from '../components/StopRow/StopRow';

class DetailLineView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Línea ${navigation.getParam('lineNumber')}`,
    headerLeft: (
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 }}
        >
          <FontAwesome
            name="angle-left"
            style={{ color: '#b0b7c4', fontSize: 30 }}
          />
        </TouchableOpacity>
      </View>
    ),
  });

  constructor(props) {
    super(props);
    this.navigation = props.navigation;
  }

  componentDidMount() {
    const { fetchInfoLine, navigation } = this.props;
    fetchInfoLine(navigation.getParam('lineNumber'), navigation.getParam('directionLine'));
  }

  addFavorite = (item) => {
    const { addFavorite } = this.props;

    addFavorite(item);
  };

  keyExtractor = item => `line-${item.stopId}`;

  deleteFavorite = (item) => {
    const { deleteFavorite } = this.props;

    deleteFavorite(item);
  }

  renderItem = ({ item, index }) => {
    const { navigation } = this.props;

    if (!item) {
      return null;
    }

    return (
      <StopRow
        item={item}
        index={index}
        navigation={navigation}
        addFavorite={this.addFavorite}
        deleteFavorite={this.deleteFavorite}
        isFavorite={item.isFavorite}
      />
    );
  }

  render() {
    const { infoLine } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: '#fafbfd' }}>
        {infoLine.stop && infoLine.stop.length > 0 && (
          <FlatList
            data={infoLine.stop}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        )}
        {infoLine.stop.length === 0 && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator />
          </View>
        )}
      </View>
    );
  }
}

DetailLineView.defaultProps = {
  fetchInfoLine: this.fetchInfoLine,
  infoLine: {
    stop: [],
  },
  navigation: this.navigation,
  addFavorite: PropTypes.func,
  deleteFavorite: PropTypes.func,
};

DetailLineView.propTypes = {
  fetchInfoLine: PropTypes.func,
  infoLine: PropTypes.shape({
    stop: PropTypes.arrayOf(PropTypes.shape({
      stopId: PropTypes.string,
      name: PropTypes.string,
      pmv: PropTypes.number,
      postalAddress: PropTypes.string,
      isFavorite: PropTypes.bool,
      lineId: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
      ]),
    })),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  addFavorite: PropTypes.func,
  deleteFavorite: PropTypes.func,
};

export default withNavigation(DetailLineView);
