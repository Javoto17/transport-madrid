import React from 'react';
import { AppLoading, Asset } from 'expo';
import Constants from 'expo-constants';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { setExpoStatusBarHeight } from 'react-navigation-collapsible';
import Sentry from 'sentry-expo';
import createStore from './src/modules/createStore';
import AppContainer from './src/AppContainer';

const store = createStore();
const dev = require('./assets/images/robot-dev.png');
const prod = require('./assets/images/robot-prod.png');

setExpoStatusBarHeight(Constants.statusBarHeight);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  componentDidMount() {
    Sentry.config(
      'https://a8796fb88fc24feaaa9df5ed08b92530@sentry.io/1400694',
    ).install();
  }

  _loadResourcesAsync = async () => Promise.all([Asset.loadAsync([dev, prod])]);

  _handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;

    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

App.defaultProps = {
  skipLoadingScreen: PropTypes.func,
};

App.propTypes = {
  skipLoadingScreen: PropTypes.func,
};
