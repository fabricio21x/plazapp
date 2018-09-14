import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Footer, FooterTab, Button, Icon } from 'native-base';

export default class BottomNavigation extends Component {
  constructor(props) {
    super(props);
  }

  navigateTo(screen) {
    var lastScreen = this.props.screenName;
    var newScreen = screen;
    try {
      if (lastScreen == newScreen) {
        return;
      }
      lastScreen = newScreen;
      this.props.navigation.navigate(screen);
    } catch (err) {
      //Alert.alert('From login screen');
      lastScreen = newScreen;
      this.props.navigation.navigate(screen);
    }
  }

  render() {
    return (
        <Footer>
          <FooterTab>
            <Button onPress={() => this.navigateTo('Home')}>
              <Icon type="FontAwesome" name="home" style={{ fontSize: 20 }} />
            </Button>
            <Button onPress={() => this.navigateTo('FavoriteView')}>
              <Icon type="FontAwesome" name="heart" style={{ fontSize: 20 }} />
            </Button>
            <Button onPress={() => this.navigateTo('AlertView')}>
              <Icon type="FontAwesome" active name="bell" style={{ fontSize: 20 }} />
            </Button>
            <Button onPress={() => this.navigateTo('RecentSearch')}>
              <Icon type="FontAwesome" name="search" style={{ fontSize: 20 }} />
            </Button>
          </FooterTab>
        </Footer>
    );
  }
}
