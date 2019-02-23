import React, { Component } from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import ActivityIndicator from '../components/ActivityIndicator/ActivityIndicator';
import StopRow from '../components/StopRow/StopRow';

import {
  TextEmpty,
  ViewEmpty,
} from './MyFavoritesView.style';

const ITEM_HEIGHT = 73;

class MyFavoritesView extends Component {
  static navigationOptions = () => ({
    title: 'Mis Favoritos',
  });

  constructor(props) {
    super(props);
    this.navigation = props.navigation;
  }

  componentDidMount() {
    const { getFavorites } = this.props;

    getFavorites();
  }

  addFavorite = (item) => {
    const { addFavorite } = this.props;

    addFavorite(item);
  };

  deleteFavorite = (item) => {
    const { deleteFavorite } = this.props;

    deleteFavorite(item);
  }

  getItemLayout = (data, index) => (
    { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
  );

  keyExtractor = (item, index) => `line-${item.line}-${index}`;

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

  renderEmpty = () => (
    <ViewEmpty>
      <TextEmpty numberOfLines={2} style={{ fontFamily: 'nunito-regular' }}>
        {'Todavía no has añadido ninguna parada'}
      </TextEmpty>
    </ViewEmpty>
  )

  render() {
    const { listFavorites } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: '#fafbfd' }}>
        {listFavorites && (
          <FlatList
            enableEmptySections
            data={listFavorites}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            initialNumToRender={10}
            getItemLayout={this.getItemLayout}
            style={{ flex: 1 }}
            ListEmptyComponent={this.renderEmpty}
          />
        )}
        {!listFavorites && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator />
          </View>
        )}
      </View>
    );
  }
}

MyFavoritesView.defaultProps = {
  getFavorites: PropTypes.func,
  deleteFavorite: PropTypes.func,
  addFavorite: PropTypes.func,
  listFavorites: [],
  navigation: this.navigation,
};

MyFavoritesView.propTypes = {
  getFavorites: PropTypes.func,
  deleteFavorite: PropTypes.func,
  addFavorite: PropTypes.func,
  listFavorites: PropTypes.arrayOf(PropTypes.shape({})),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default withNavigation(MyFavoritesView);
