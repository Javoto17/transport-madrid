import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';

const BackHeader = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
      }}
    >
      <FontAwesome
        name="angle-left"
        size={30}
        color="#b0b7c4"
      />
    </TouchableOpacity>
  </View>
);

BackHeader.defaultProps = {
  navigation: null,
};

BackHeader.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
};

export default BackHeader;
