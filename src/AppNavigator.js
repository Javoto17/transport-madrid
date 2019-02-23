import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';
import { BottomTabBar } from 'react-navigation-tabs';
import { PropTypes } from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import {
  Easing,
  Animated,
  Platform,
} from 'react-native';

import HomeViewContainer from './native/Home/HomeViewContainer';
import DirectionLineContainer from './native/DirectionLine/DirectionViewContainer';
import DetailLineContainer from './native/DetailLine/DetailLineViewContainer';
import MyFavoritesContainer from './native/MyFavorites/MyFavoritesViewContainer';
import DetailStopContainer from './native/DetailStop/DetailStopViewContainer';

const transitionConfig = () => ({
  transitionSpec: {
    duration: 750,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true,
  },
  screenInterpolator: (sceneProps) => {
    const { position, layout, scene } = sceneProps;

    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [width, 0, 0],
    });

    const slideFromRight = { transform: [{ translateX }] };

    return slideFromRight;
  },
});


const defaultNavigationOptions = {
  headerForceInset: {
    top: 'never',
    bottom: 'never',
  },
  headerTitleStyle: {
    flex: 1,
    fontSize: 24,
    marginVertical: Platform.select({ ios: 6, android: 4 }),
    fontFamily: 'nunito-bold',
  },
  headerStyle: {
    backgroundColor: '#ffffff',
    elevation: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d0d8e8',
  },
};

const stackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeViewContainer,
    },
    DirectionLine: {
      screen: DirectionLineContainer,
    },
    DetailLine: {
      screen: DetailLineContainer,
    },
    DetailStop: {
      screen: DetailStopContainer,
    },
  },
  {
    headerMode: 'screen',
    initialRouteName: 'Home',
    transitionConfig,
    cardStyle: { shadowColor: 'transparent' },
    defaultNavigationOptions,
  },
);
const stackNavigator2 = createStackNavigator(
  {
    Favorites: {
      screen: MyFavoritesContainer,
    },
    DetailStop: {
      screen: DetailStopContainer,
    },
  },
  {
    headerMode: 'screen',
    initialRouteName: 'Favorites',
    transitionConfig,
    cardStyle: { shadowColor: 'transparent' },
    defaultNavigationOptions,
  },
);

const TabBarComponent = props => (<BottomTabBar {...props} />);

const TabIcon = ({ name, tintColor }) => (
  <FontAwesome
    name={name}
    size={25}
    color={tintColor}
    style={{ paddingVertical: 6 }}
  />
);

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: stackNavigator,
      navigationOptions: {
        tabBarLabel: 'Líneas',
        tabBarIcon: props => TabIcon({ name: 'list', ...props }),
      },
    },
    MyFavorites: {
      screen: stackNavigator2,
      navigationOptions: {
        tabBarLabel: 'Mis Paradas',
        tabBarIcon: props => TabIcon({ name: 'bus', ...props }),
      },
    },
  },
  {
    tabBarComponent: props => (
      <TabBarComponent
        {...props}
        style={{
          backgroundColor: '#ffffff',
          borderTopColor: '#d0d8e8',
        }}
      />
    ),
    tabBarOptions: {
      activeTintColor: '#027bff',
      inactiveTintColor: '#b0b7c4',
      labelStyle: {
        fontSize: 14,
        paddingVertical: 0,
      },
      showIcon: true,
      showLabel: false,
    },
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  },
);

export default createAppContainer(AppNavigator);

TabIcon.propTypes = {
  tintColor: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  name: PropTypes.string,
};

TabIcon.defaultProps = {
  tintColor: 'orange',
  name: 'list',
};
