import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

const ActivityIndicatorComponent = ({ color }) => (
  <ActivityIndicator size="large" color={color} />
);

ActivityIndicatorComponent.defaultProps = {
  color: '#027bff',
};

ActivityIndicatorComponent.propTypes = {
  color: PropTypes.string,
};


export default ActivityIndicatorComponent;
