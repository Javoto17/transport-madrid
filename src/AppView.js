import React, { PureComponent } from 'react';
import Expo from 'expo';
import { StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import PropTypes from 'prop-types';
import AppNavigator from './AppNavigator';

const nunitoBold = require('../assets/fonts/nunito/Nunito-Bold.ttf');
const nunitoRegular = require('../assets/fonts/nunito/Nunito-Regular.ttf');
const nunitoLight = require('../assets/fonts/nunito/Nunito-Light.ttf');

class AppView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    };
  }

  componentWillMount() {
    const { loadFavorites } = this.props;

    loadFavorites();
  }

  async componentDidMount() {
    await Expo.Font.loadAsync({
      'nunito-bold': nunitoBold,
      'nunito-regular': nunitoRegular,
      'nunito-light': nunitoLight,

    });

    this.setState({ fontLoaded: true });
  }

  render() {
    const { fontLoaded } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} forceInset={{ top: 'always', bottom: 'never', horizontal: 'never' }}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {fontLoaded && <AppNavigator />}
      </SafeAreaView>
    );
  }
}

AppView.defaultProps = {
  loadFavorites: PropTypes.func,

};

AppView.propTypes = {
  loadFavorites: PropTypes.func,
};
export default AppView;
