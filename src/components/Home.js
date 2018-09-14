import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView } from 'react-native';

import List from './List';
import Slide from './Slider';
import Header from './Header';
import SideMenu from 'react-native-side-menu';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    // Hide the navigation bar
    header: null
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={[{ flex: 1 }, myStlyles.container]}>
          <View style={myStlyles.container}>
            <Header />
            <Slide />
            <List navigation={this.props.navigation} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const myStlyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
});
