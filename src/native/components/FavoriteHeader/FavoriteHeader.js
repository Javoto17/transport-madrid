import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const FavoriteHeader = ({ navigation }) => (
  <TouchableOpacity
    onPress={
      !navigation.getParam('detailStop').isFavorite
        ? navigation.getParam('addFavorite')
        : navigation.getParam('deleteFavorite')
    }
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
    }}
  >
    <FontAwesome
      name="star"
      color={
        navigation.getParam('detailStop').isFavorite ? '#027bff' : '#99a2b4'
      }
      size={20}
    />
  </TouchableOpacity>
);

FavoriteHeader.defaultProps = {
  navigation: null,
};

FavoriteHeader.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }),
};

export default FavoriteHeader;
