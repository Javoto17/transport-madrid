import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  Linking,
  Platform,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';
import { withNavigation } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';

import ActivityIndicator from '../components/ActivityIndicator/ActivityIndicator';
import BackHeader from '../components/BackHeader/BackHeader';
import FavoriteHeader from '../components/FavoriteHeader/FavoriteHeader';
import UpdateHeader from '../components/UpdateHeader/UpdateHeader';

import { getTime } from '../../utils/Timer';
import { convertLineNumber } from '../../utils/Stops';

class DetailStopView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Parada - ${navigation.getParam('detailStop').stop}`,
    headerLeft: <BackHeader navigation={navigation} />,
    headerRight: (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <FavoriteHeader navigation={navigation} />
        <UpdateHeader navigation={navigation} />
      </View>
    ),
  });

  componentDidMount() {
    const { fetchBusStopTimes, navigation } = this.props;
    const {
      state: {
        params: { detailStop },
      },
    } = navigation;

    navigation.setParams({
      addFavorite: this.addFavorite,
      deleteFavorite: this.deleteFavorite,
      fetchBusStopTimes: () => fetchBusStopTimes(detailStop.stop),
    });

    fetchBusStopTimes(detailStop.stop);
  }

  componentWillReceiveProps(nextProps) {
    const { navigation, detailStop } = this.props;

    if (
      detailStop.isFavorite !== nextProps.detailStop.isFavorite
      && nextProps.detailStop.isFavorite
    ) {
      navigation.setParams({
        detailStop: nextProps.detailStop,
        isFavorite: true,
      });
    }
    if (
      detailStop.isFavorite !== nextProps.detailStop.isFavorite
      && !nextProps.detailStop.isFavorite
    ) {
      navigation.setParams({
        detailStop: nextProps.detailStop,
        isFavorite: false,
      });
    }
  }

  addFavorite = () => {
    const { addFavorite, navigation } = this.props;
    const {
      state: {
        params: { detailStop },
      },
    } = navigation;
    addFavorite(detailStop);
  };

  keyExtractor = item => `busStop-${item.line}`;

  deleteFavorite = () => {
    const { deleteFavorite, navigation } = this.props;
    const {
      state: {
        params: { detailStop },
      },
    } = navigation;

    deleteFavorite(detailStop);
  };

  _handlePressDirections = () => {
    const { navigation } = this.props;
    const item = navigation.getParam('detailStop');

    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${item.geometry.coordinates[1]},${
      item.geometry.coordinates[0]
    }`;
    const label = `${item.postalAddress}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.canOpenURL(url)
      .then(supported => (!supported
        ? console.log(`Can't handle url: ${url}`)
        : Linking.openURL(url)))
      .catch(err => console.error('An error occurred', err));
  };

  _renderItem = ({ item }) => {
    const {
      infoStop: { times },
    } = this.props;

    if (!item) {
      return null;
    }
    const timesStop = Array.isArray(times) ? times : [{ ...times }];

    const myTimes = timesStop.filter(el => el.line === item.line);

    if (myTimes) {
      return (
        <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 4 }}>
          <View style={{ flex: 0.33, alignItems: 'center' }}>
            <Text style={{ fontFamily: 'nunito-bold', fontSize: 18 }}>
              {`${item.line}`}
            </Text>
          </View>
          <View style={{ flex: 0.33, alignItems: 'center' }}>
            {!!myTimes[0] && Number.isInteger(myTimes[0].estimateArrive) ? (
              <Text style={{ fontFamily: 'nunito-light', fontSize: 18 }}>
                {`${getTime(myTimes[0].estimateArrive)}`}
              </Text>
            ) : (
              <Text style={{ fontFamily: 'nunito-light', fontSize: 18 }}>
                {'-'}
              </Text>
            )}
          </View>
          <View style={{ flex: 0.33, alignItems: 'center' }}>
            {!!myTimes[1] && Number.isInteger(myTimes[1].estimateArrive) ? (
              <Text style={{ fontFamily: 'nunito-light', fontSize: 18 }}>
                {`${getTime(myTimes[1].estimateArrive)}`}
              </Text>
            ) : (
              <Text style={{ fontFamily: 'nunito-light', fontSize: 18 }}>
                {'-'}
              </Text>
            )}
          </View>
        </View>
      );
    }

    return null;
  };

  renderHeader = () => (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 0.33, alignItems: 'center', paddingVertical: 2 }}>
        <Text style={{ fontFamily: 'nunito-bold', fontSize: 22 }}>Línea</Text>
      </View>
      <View style={{ flex: 0.33, alignItems: 'center', paddingVertical: 2 }}>
        <Text style={{ fontFamily: 'nunito-bold', fontSize: 22 }}>Primero</Text>
      </View>
      <View style={{ flex: 0.33, alignItems: 'center', paddingVertical: 2 }}>
        <Text style={{ fontFamily: 'nunito-bold', fontSize: 22 }}>Segundo</Text>
      </View>
    </View>
  );

  render() {
    const { navigation, infoStop, loadingArrives } = this.props;
    const {
      state: {
        params: { detailStop },
      },
    } = navigation;

    const linesTime = Array.isArray(detailStop.dataLine)
      ? detailStop.dataLine.map(el => Object.assign({}, { line: convertLineNumber(el) }))
      : [{ line: convertLineNumber(detailStop.line) }];

    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: '#fafbfd', position: 'relative' }}
      >
        <View
          style={{ flex: 1, backgroundColor: '#fafbfd', position: 'relative' }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderBottomWidth: 1,
              borderBottomColor: '#d0d8e8',
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                paddingLeft: 16,
                paddingVertical: 8,
              }}
            >
              <Text
                style={{
                  fontFamily: 'nunito-bold',
                  fontSize: 18,
                  color: 'black',
                }}
              >
                {`PARADA Nº ${detailStop.stop}`}
              </Text>
              <Text
                style={{
                  fontFamily: 'nunito-regular',
                  fontSize: 16,
                  color: '#4c4c4c',
                }}
              >
                {detailStop.name}
              </Text>
              <Text
                onPress={this._handlePressDirections}
                style={{
                  fontFamily: 'nunito-regular',
                  fontSize: 16,
                  color: '#4c4c4c',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {detailStop.postalAddress}
                <MaterialIcons name="location-on" size={16} color="#4c4c4c" />
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderTopColor: '#d0d8e8',
              borderBottomColor: '#d0d8e8',
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <View>
              {infoStop && linesTime && !loadingArrives && (
                <FlatList
                  data={linesTime}
                  keyExtractor={this.keyExtractor}
                  renderItem={this._renderItem}
                  ListHeaderComponent={this.renderHeader}
                />
              )}
              {(!infoStop || !linesTime || loadingArrives) && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 16,
                  }}
                >
                  <ActivityIndicator />
                </View>
              )}
            </View>
          </View>

          <MapView
            style={{
              flex: 0.34,
              height: 125,
              marginBottom: 20,
            }}
            onPress={this._handlePressDirections}
            initialRegion={{
              latitude: detailStop.geometry.coordinates[1],
              longitude: detailStop.geometry.coordinates[0],
              latitudeDelta: 0.0021,
              longitudeDelta: 0.0021,
            }}
            scrollEnabled={false}
          >
            <MapView.Marker
              coordinate={{
                latitude: detailStop.geometry.coordinates[1],
                longitude: detailStop.geometry.coordinates[0],
              }}
              onPress={this._handlePressDirections}
            />
          </MapView>
        </View>
      </ScrollView>
    );
  }
}

DetailStopView.defaultProps = {
  fetchBusStopTimes: this.fetchBusStopTimes,
  infoStop: PropTypes.shape({
    times: PropTypes.arrayOf(
      PropTypes.shape({
        line: PropTypes.string,
        estimateArrive: PropTypes.number,
      }),
    ),
  }),
  navigation: this.navigation,
  addFavorite: PropTypes.func,
  deleteFavorite: PropTypes.func,
  loadingArrives: PropTypes.bool,
  detailStop: PropTypes.shape({
    isFavorite: PropTypes.bool,
    line: PropTypes.string,
  }),
};

DetailStopView.propTypes = {
  fetchBusStopTimes: PropTypes.func,
  addFavorite: PropTypes.func,
  deleteFavorite: PropTypes.func,
  loadingArrives: PropTypes.bool,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  infoStop: PropTypes.shape({
    times: PropTypes.arrayOf(
      PropTypes.shape({
        line: PropTypes.string,
        estimateArrive: PropTypes.number,
      }),
    ),
    // detail: PropTypes.shape({}),
  }),
  detailStop: PropTypes.shape({
    isFavorite: PropTypes.bool,
    line: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]),
  }),
};

export default withNavigation(DetailStopView);
