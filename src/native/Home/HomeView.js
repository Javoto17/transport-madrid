import React, { Component } from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import ActivityIndicator from '../components/ActivityIndicator/ActivityIndicator';
import {
  LineContainer,
  LineContent,
  LineText,
  LineNumber,
  NumberContent,
} from './HomeView.style';

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

    const nameA = item.nameA.split().length === 1 ? item.nameA.trim() : item.nameA;

    return (
      <LineContainer key={`line-${item.line}-${index}`} isEvent={index % 2} onPress={() => navigation.navigate('DirectionLine', { line: item.label })}>
        <NumberContent>
          <LineNumber>
            {item.label}
          </LineNumber>
        </NumberContent>
        <LineContent>
          <LineText>
            {`${nameA} - ${item.nameB}`}
          </LineText>
        </LineContent>
      </LineContainer>
    );
  }

  render() {
    const { listLines, isLoading } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: '#fafbfd' }}>
        {isLoading && (
          <FlatList
            enableEmptySections
            data={listLines.resultValues}
            removeClippedSubviews
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            initialNumToRender={10}
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
