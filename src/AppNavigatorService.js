import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function getNavigatorState() {
  return _navigator ? _navigator.state : {};
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function redirectRoute(name) {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName: name,
        }),
      ],
    }),
  );
}

function goBack(key) {
  _navigator.dispatch(
    NavigationActions.back({ key }),
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  redirectRoute,
  goBack,
  setTopLevelNavigator,
  getNavigatorState,
};
