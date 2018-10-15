import React, { Component } from 'react';
import {
  View,
  FlatList,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import ActivityIndicator from '../components/ActivityIndicator/ActivityIndicator';
import LineRow from '../components/LineRow.js/LineRow';

const ITEM_HEIGHT = 73;

class HomeView extends Component {
  static navigationOptions = () => ({
    title: 'Listado de Lineas',
  });

  constructor(props) {
    super(props);
    this.navigation = props.navigation;
  }

  componentDidMount() {
    const { fetchListLines } = this.props;

    fetchListLines();
  }

  shouldComponentUpdate(nextProps) {
    const { listLines } = this.props;

    if (listLines !== nextProps.listLines) {
      return true;
    }

    return false;
  }

  getItemLayout = (data, index) => (
    { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
  );

  keyExtractor = item => `line-${item.line}`;

  renderItem = ({ item, index }) => {
    const { navigation } = this.props;

    if (!item) {
      return null;
    }

    return (
      <LineRow
        item={item}
        index={index}
        navigation={navigation}
      />
    );
  }

  render() {
    const { listLines, isLoading } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: '#fafbfd' }}>
        {isLoading && (
          <FlatList
            data={listLines.resultValues}
            removeClippedSubviews={Platform.OS === 'android'}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            initialNumToRender={10}
            windowSize={8}
            getItemLayout={this.getItemLayout}
          />
        )}

        {!isLoading && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator />
          </View>
        )}
      </View>
    );
  }
}

HomeView.defaultProps = {
  fetchListLines: this.fetchListLines,
  isLoading: false,
  listLines: {
    resultValues: [],
  },
  navigation: this.navigation,
};

HomeView.propTypes = {
  fetchListLines: PropTypes.func,
  isLoading: PropTypes.bool,
  listLines: PropTypes.shape({
    resultValues: PropTypes.arrayOf(PropTypes.shape({
      nameA: PropTypes.string,
      nameB: PropTypes.string,
      line: PropTypes.string,
    })),
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default withNavigation(HomeView);
