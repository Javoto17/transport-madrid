import React, { Component } from 'react';
import {
  View,
  FlatList,
  Platform,
  Animated,
  Text,
  Dimensions,
} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';

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
      index: 0,
      routes: [
        { key: 'stops', title: 'Paradas' },
        { key: 'lines', title: 'Líneas' },
      ],
    };

    this.navigation = props.navigation;
  }

  componentDidMount() {
    const { searchValue, openSearch, index } = this.state;

    this.navigation.setParams({
      onChangeText: this.onChangeText,
      searchValue,
      openSearch,
      index,
      changeHeader: this.changeHeader,
      searchStop: this.searchStop,
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

    this.setState(
      {
        openSearch: !openSearch,
        searchValue: !openSearch ? '' : searchValue,
      },
      () => {
        navigation.setParams({
          openSearch: !openSearch,
          searchValue: !openSearch ? '' : searchValue,
        });
        if (openSearch) {
          filterLinesByCriterial(null);
        }
      },
    );
  };

  onChangeIndex = (i) => {
    const { navigation } = this.props;

    this.setState(
      {
        index: i,
      },
      () => {
        navigation.setParams({
          index: i,
        });
      },
    );
  };

  onChangeText = (searchValue) => {
    const { navigation, filterLinesByCriterial } = this.props;
    const { openSearch, index } = this.state;

    this.setState(
      {
        searchValue,
        openSearch:
          searchValue.length === 0 && index === 0 ? false : openSearch,
      },
      () => {
        filterLinesByCriterial(searchValue);
        navigation.setParams({
          searchValue,
          openSearch:
            searchValue.length === 0 && index === 0 ? false : openSearch,
        });
      },
    );
  };

  searchStop = () => {
    const { searchValue } = this.state;
    const { fetchBusStop } = this.props;

    if (searchValue.length > 0) {
      fetchBusStop(searchValue);
    }
  };

  getItemLayout = (data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  keyExtractor = item => `line-${item.line}`;

  renderItem = ({ item, index }) => {
    const { navigation } = this.props;

    if (!item) {
      return null;
    }

    return <LineRow item={item} index={index} navigation={navigation} />;
  };

  renderList = () => {
    const { isLoading, listLinesFiltered } = this.props;

    return isLoading ? (
      <AnimatedFL
        data={listLinesFiltered}
        removeClippedSubviews={Platform.OS === 'android'}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        initialNumToRender={10}
        windowSize={10}
        getItemLayout={this.getItemLayout}
      />
    ) : (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  };

  emptyStops = () => {
    const { isLoading } = this.props;

    return isLoading ? (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontFamily: 'nunito-regular',
            fontSize: 20,
            color: 'black',
          }}
        >
          Introduce el codigo de la parada
        </Text>
      </View>
    ) : (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  };

  render() {
    const { openSearch, index, routes } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: '#fafbfd' }}>
        {!openSearch && this.renderList()}
        {openSearch && (
          <TabView
            navigationState={{ index, routes }}
            renderTabBar={props => (
              <TabBar
                {...props}
                renderLabel={({ route, focused }) => (
                  <View
                    style={{
                      borderRadius: 6,
                      paddingVertical: 8,
                      paddingHorizontal: 24,
                      overFlow: 'hidden',
                      backgroundColor: focused ? '#027bff' : 'transparent',
                    }}
                  >
                    <Text
                      style={{
                        color: focused ? '#fff' : '#4c4c4c',
                        fontFamily: 'nunito-bold',
                      }}
                    >
                      {route.title}
                    </Text>
                  </View>
                )}
                indicatorStyle={{ backgroundColor: '027bff' }}
                style={{
                  backgroundColor: '#fff',
                  color: '#027bff',
                  elevation: 0,
                  borderBottomWidth: 1,
                  borderColor: '#d0d8e8',
                }}
              />
            )}
            renderScene={({ route }) => {
              switch (route.key) {
              case 'stops':
                return this.emptyStops();
              case 'lines':
                return this.renderList();
              default:
                return null;
              }
            }}
            onIndexChange={this.onChangeIndex}
            initialLayout={{ width: Dimensions.get('window').width }}
          />
        )}
      </View>
    );
  }
}

HomeView.defaultProps = {
  fetchListLines: () => {},
  filterLinesByCriterial: () => {},
  fetchBusStop: () => {},
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
  fetchBusStop: PropTypes.func,
  collapsible: PropTypes.shape({
    paddingHeight: PropTypes.number,
    scrollY: PropTypes.number,
  }),
};

export default withNavigation(HomeView);
