import React, { PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Linking,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { MapView } from 'expo';
import { withNavigation } from 'react-navigation';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import ActivityIndicator from '../components/ActivityIndicator/ActivityIndicator';
import { getTime } from '../../utils/Timer';


class DetailStopView extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: `Parada - ${navigation.getParam('detailStop').stopId}`,
    headerLeft: (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
    headerRight: (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      }}
      >
        <TouchableOpacity
          onPress={!navigation.getParam('isFavorite') ? navigation.getParam('addFavorite') : navigation.getParam('deleteFavorite')}
          style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 }}
        >
          <FontAwesome
            name="star"
            style={{ color: navigation.getParam('isFavorite') ? '#027bff' : '#99a2b4' }}
            size={20}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigation.getParam('fetchBusStop')}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
            paddingTop: 4,
          }}
        >
          <MaterialCommunityIcons
            name="reload"
            color="#99a2b4"
            size={24}
          />
        </TouchableOpacity>
      </View>
    ),
  });

  componentDidMount() {
    const { fetchBusStop, navigation } = this.props;
    const { state: { params: { detailStop } } } = navigation;

    navigation.setParams({
      addFavorite: this.addFavorite,
      deleteFavorite: this.deleteFavorite,
      isFavorite: detailStop.isFavorite,
      fetchBusStop: () => fetchBusStop(detailStop.stopId),
    });

    fetchBusStop(detailStop.stopId);
  }

  componentWillReceiveProps(nextProps) {
    const { navigation, detailStop } = this.props;
    if (detailStop.isFavorite && detailStop.isFavorite !== nextProps.detailStop.isFavorite && nextProps.detailStop.isFavorite) {
      navigation.setParams({ detailStop: nextProps.detailStop, isFavorite: nextProps.detailStop.isFavorite });
    }
    if (detailStop.isFavorite && detailStop.isFavorite !== nextProps.detailStop.isFavorite && !nextProps.detailStop.isFavorite) {
      navigation.setParams({ detailStop: nextProps.detailStop, isFavorite: false });
    }
  }

  addFavorite = () => {
    const { addFavorite, navigation } = this.props;
    const { state: { params: { detailStop } } } = navigation;

    addFavorite(detailStop);
  };

  keyExtractor = item => `busStop-${item.lineId}`;

  deleteFavorite = () => {
    const { deleteFavorite, navigation } = this.props;
    const { state: { params: { detailStop } } } = navigation;

    deleteFavorite(detailStop);
  }

  _handlePressDirections = () => {
    const { navigation } = this.props;
    const item = navigation.getParam('detailStop');

    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${item.latitude},${item.longitude}`;
    const label = `${item.postalAddress}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  }

  _renderItem = ({ item }) => {
    const { infoStop } = this.props;

    if (!item) {
      return null;
    }


    const timesStop = Array.isArray(infoStop) ? infoStop : [{ ...infoStop }];

    const myTimes = timesStop.filter(el => parseInt(el.lineId, 10) === parseInt(item.lineId, 10));

    if (myTimes) {
      return (
        <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 4 }}>
          <View style={{ flex: 0.33, alignItems: 'center' }}>
            <Text style={{ fontFamily: 'nunito-regular', fontSize: 18 }}>{item.lineId}</Text>
          </View>
          <View style={{ flex: 0.33, alignItems: 'center' }}>
            {myTimes[0] && myTimes[0].busTimeLeft && (<Text style={{ fontFamily: 'nunito-regular', fontSize: 18 }}>{`${getTime(myTimes[0].busTimeLeft)}`}</Text>)}
          </View>
          <View style={{ flex: 0.33, alignItems: 'center' }}>
            {myTimes[1] && myTimes[1].busTimeLeft && (<Text style={{ fontFamily: 'nunito-regular', fontSize: 18 }}>{`${getTime(myTimes[1].busTimeLeft)}`}</Text>)}
          </View>
        </View>
      );
    }

    return null;
  }

  renderHeader = () => (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 0.33, alignItems: 'center', paddingVertical: 2 }}>
        <Text style={{ fontFamily: 'nunito-bold', fontSize: 24 }}>Linea</Text>
      </View>
      <View style={{ flex: 0.33, alignItems: 'center', paddingVertical: 2 }}>
        <Text style={{ fontFamily: 'nunito-bold', fontSize: 24 }}>Primero</Text>
      </View>
      <View style={{ flex: 0.33, alignItems: 'center', paddingVertical: 2 }}>
        <Text style={{ fontFamily: 'nunito-bold', fontSize: 24 }}>Segundo</Text>
      </View>
    </View>
  );

  render() {
    const { navigation, infoStop, loadingArrives } = this.props;
    const { state: { params: { detailStop } } } = navigation;

    const linesTime = Array.isArray(detailStop.lineId) ? detailStop.lineId.map(el => Object.assign({}, { lineId: el })) : [{ lineId: detailStop.lineId }];


    return (
      <View style={{ flex: 1, backgroundColor: '#fafbfd' }}>
        <View style={{ flex: 1, backgroundColor: '#fafbfd' }}>
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
              <Text style={{ fontFamily: 'nunito-bold', fontSize: 16, color: 'black' }}>
                {`PARADA Nº ${detailStop.stopId}`}
              </Text>
              <Text style={{ fontFamily: 'nunito-regular', fontSize: 16, color: '#4c4c4c' }}>
                {detailStop.name}
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
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 16 }}>
                  <ActivityIndicator />
                </View>
              )}
            </View>
          </View>

          <MapView
            style={{
              flex: 0.34,
              marginBottom: 20,
            }}
            onPress={this._handlePressDirections}
            initialRegion={{
              latitude: detailStop.latitude,
              longitude: detailStop.longitude,
              latitudeDelta: 0.0021,
              longitudeDelta: 0.0021,
            }}
          >
            <MapView.Marker coordinate={{
              latitude: detailStop.latitude,
              longitude: detailStop.longitude,
            }}
            />
          </MapView>

        </View>

      </View>
    );
  }
}

DetailStopView.defaultProps = {
  fetchBusStop: this.fetchBusStop,
  infoStop: PropTypes.arrayOf(PropTypes.shape({
    lineId: PropTypes.string,
    busTimeLeft: PropTypes.number,
  })),
  navigation: this.navigation,
  addFavorite: PropTypes.func,
  deleteFavorite: PropTypes.func,
  loadingArrives: PropTypes.bool,
  detailStop: PropTypes.shape({
    isFavorite: PropTypes.bool,
    lineId: PropTypes.string,
  }),
};

DetailStopView.propTypes = {
  fetchBusStop: PropTypes.func,
  addFavorite: PropTypes.func,
  deleteFavorite: PropTypes.func,
  loadingArrives: PropTypes.bool,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  infoStop: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      lineId: PropTypes.string,
      busTimeLeft: PropTypes.number,
    })),
    PropTypes.shape({
      lineId: PropTypes.string,
      busTimeLeft: PropTypes.number,
    }),
  ]),
  detailStop: PropTypes.shape({
    isFavorite: PropTypes.bool,
    lineId: PropTypes.string,
  }),
};

export default withNavigation(DetailStopView);
