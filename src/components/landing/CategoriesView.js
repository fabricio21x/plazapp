import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import CategoriesList from './CategoriesList';
import BottomNavigation from '../auth/bottomNavigation';


export default class CategoriesView extends Component {
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
                <View style={myStyles.background}>
                  <TouchableWithoutFeedback onPress={() => this.toggle()}>
                    <Icon
                      name="bars" /* el nombre del dibujito es bars */
                      color="#000000"
                      size={25}
                    />
                  </TouchableWithoutFeedback>
                  <Text
                  style={{ 
                    textAlign: 'center',
                    fontSize: 24,
                     }}
                  >
                  Productos por Categorías
                  </Text>
                </View>        
                  <ScrollView style={[{ flex: 1 }, myStyles.paddedContainer]}>
                    <CategoriesList navigation={this.props.navigation} />             
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
  },
  background: {
    flexDirection:
      'row' /* Indica la dirección en la que se van a desplegar todos los elementos */,
    height: 80,
    alignItems:
      'center' /* Indica que los elementos se centrarán teniendo en cuenta la forma vertical */,
    justifyContent:
      'space-between' /* Reparte de manera homogénea cada elemento en todo el espacio definido */,
    backgroundColor: 'white',
    paddingHorizontal: 15 /* Colocamos un espacio entre el borde interno del espacio (derecha e izquierda) y el contenido */,
    paddingTop: 10
  }
});
