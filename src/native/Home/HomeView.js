import React, { Component } from 'react';
import {
  View,
  FlatList,
  Platform,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import ActivityIndicator from '../components/ActivityIndicator/ActivityIndicator';
import LineRow from '../components/LineRow.js/LineRow';
import SearchHeader from '../components/SearchHeader/SearchHeader';

const AnimatedFL = Animated.createAnimatedComponent(FlatList);

const ITEM_HEIGHT = 73;

class HomeView extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <SearchHeader navigation={navigation} title="Listado de Líneas" />,
  });

  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      openSearch: false,
    };

    this.navigation = props.navigation;
  }

  componentDidMount() {
    const { fetchListLines } = this.props;
    const { searchValue, openSearch } = this.state;

    fetchListLines();

    this.navigation.setParams({
      onChangeText: this.onChangeText,
      searchValue,
      openSearch,
      changeHeader: this.changeHeader,
    });
  }

  shouldComponentUpdate(nextState, nextProps) {
    const { listLinesFiltered } = this.props;
    const { searchValue, openSearch } = this.state;

    if (listLinesFiltered !== nextProps.listLinesFiltered) {
      return true;
    }

    if (searchValue !== nextState.searchValue) {
      return true;
    }

    if (openSearch !== nextState.openSearch) {
      return true;
    }

    return false;
  }

  changeHeader = () => {
    const { openSearch, searchValue } = this.state;
    const { navigation, filterLinesByCriterial } = this.props;

    this.setState({
      openSearch: !openSearch,
      searchValue: !openSearch ? '' : searchValue,
    }, () => {
      navigation.setParams({
        openSearch: !openSearch,
        searchValue: !openSearch ? '' : searchValue,
      });

      if (openSearch) {
        filterLinesByCriterial(null);
      }
    });
  }

  onChangeText = (searchValue) => {
    const { navigation, filterLinesByCriterial } = this.props;

    // console.log(searchValue);

    this.setState({
      searchValue,
    }, () => {
      filterLinesByCriterial(searchValue);
      navigation.setParams({
        searchValue,
      });
    });
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
    const { isLoading, listLinesFiltered, collapsible } = this.props;
    const { paddingHeight, animatedY, onScroll } = collapsible;

    return (
      <View style={{ flex: 1, backgroundColor: '#fafbfd' }}>
        {isLoading ? (
          <AnimatedFL
            data={listLinesFiltered}
            removeClippedSubviews={Platform.OS === 'android'}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            initialNumToRender={10}
            windowSize={10}
            getItemLayout={this.getItemLayout}
          // contentContainerStyle={{ paddingTop: paddingHeight }}
          // scrollIndicatorInsets={{ top: paddingHeight }}
          // onScroll={onScroll}
          // _mustAddThis={animatedY}
          />
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator />
          </View>
        )}
      </View>
    );
  }
}

// const collapsibleParams = {
//   iOSCollapsedColor: 'red',
//   collapsibleComponent: SearchHeader,
//   collapsibleBackgroundStyle: {
//     height: 60,
//     backgroundColor: 'red',
//     // disableFadeoutInnerComponent: true,
//   },
// };

HomeView.defaultProps = {
  fetchListLines: () => { },
  filterLinesByCriterial: () => { },
  isLoading: false,
  listLinesFiltered: [],
  navigation: this.navigation,
  collapsible: {},
};

HomeView.propTypes = {
  fetchListLines: PropTypes.func,
  isLoading: PropTypes.bool,
  listLinesFiltered: PropTypes.arrayOf(
    PropTypes.shape({
      nameA: PropTypes.string,
      nameB: PropTypes.string,
      line: PropTypes.string,
    }),
  ),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  filterLinesByCriterial: PropTypes.func,
  collapsible: PropTypes.shape({
    paddingHeight: PropTypes.number,
    scrollY: PropTypes.number,
  }),
};

export default withNavigation(HomeView);
