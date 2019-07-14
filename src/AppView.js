import React, { PureComponent } from 'react';
import * as Font from 'expo-font';
import { StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import PropTypes from 'prop-types';

import NavigationService from './AppNavigatorService';
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
    const { loadFavorites, loginEmt } = this.props;

    loginEmt();
    loadFavorites();
  }

  async componentDidMount() {
    await Font.loadAsync({
      'nunito-bold': nunitoBold,
      'nunito-regular': nunitoRegular,
      'nunito-light': nunitoLight,
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    const { fontLoaded } = this.state;

    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: '#ffffff' }}
        forceInset={{ top: 'always', bottom: 'never', horizontal: 'never' }}
      >
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {fontLoaded && (
          <AppNavigator
            ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        )}
      </SafeAreaView>
    );
  }
}

AppView.defaultProps = {
  loadFavorites: PropTypes.func,
  loginEmt: PropTypes.func,
};

AppView.propTypes = {
  loadFavorites: PropTypes.func,
  loginEmt: PropTypes.func,
};

export default AppView;
