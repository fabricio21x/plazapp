import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import Routes from './config/routes';
import getStore, { addListener } from './store';
import { Root } from 'native-base';

const Navigator = StackNavigator(Routes, {
  headerMode: 'screen',
  //initialRouteName: 'HomeScreen'
});

const navReducer = (state, action) => {
  const newState = Navigator.router.getStateForAction(action, state);
  return newState || state;
};

class App extends Component {
  render() {
    return (
      <Root>
        <Navigator
          navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav,
            addListener
          })}
        />
      </Root>
    );
  }
}

const store = getStore(navReducer);

const AppIndex = connect(state => ({ nav: state.nav }))(App);

export default (Index = () => (
  <Provider store={store}>
    <AppIndex />
  </Provider>
));
