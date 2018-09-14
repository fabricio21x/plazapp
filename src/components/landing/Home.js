import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Container } from 'native-base';

import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import HomeList from './HomeList';
import Slide from './Slider';
import Header from './Header';
import BottomNavigation from '../auth/bottomNavigation';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  static navigationOptions = {
    header: null
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  updateMenu(isOpen) {
    this.setState({ isOpen });
  }


  render() {
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <SideMenu
          menu={<Menu navigation={this.props.navigation} />}
          isOpen={this.state.isOpen}
          onChange={(isOpen) => this.updateMenu(isOpen)} 
          >
              <View style={myStyles.container}>        
                  <Header toggle={this.toggle.bind(this)} />
                  <ScrollView style={[{ flex: 1 }, myStyles.paddedContainer]}>
                    <Slide />
                    <HomeList navigation={this.props.navigation} />             
                  </ScrollView>   
              </View>            
          </SideMenu>      
        </View>
        <BottomNavigation navigation={this.props.navigation} screenName='Home' />
      </Container>
    );
  }
}

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  paddedContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  }
});
