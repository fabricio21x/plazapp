import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'; /* Especificamos que usaremos los iconos del tipo FontAwesome */
import Logo from './Logo';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //const { navigate } = this.props.navigation;
    return (
      <View style={myStyles.background}>
        <TouchableWithoutFeedback onPress={() => this.props.toggle()}>
          <Icon
            name="bars" /* el nombre del dibujito es bars */
            color="#000000"
            size={25}
          />
        </TouchableWithoutFeedback>
        <Logo />
      </View>
    );
  }
}

const myStyles = StyleSheet.create({
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
