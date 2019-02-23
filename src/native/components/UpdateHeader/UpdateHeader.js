import React from 'react';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, Platform } from 'react-native';

const UpdateHeader = ({ navigation }) => (
  <TouchableOpacity
    onPress={navigation.getParam('fetchBusStop')}
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      marginTop: Platform.select({ ios: 4, android: 0 }),
    }}
  >
    <MaterialCommunityIcons name="reload" color="#99a2b4" size={24} />
  </TouchableOpacity>
);

UpdateHeader.defaultProps = {
  navigation: null,
};

UpdateHeader.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }),
};

export default UpdateHeader;
