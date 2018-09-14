import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import {
  Item,
  Input,
  Form,
  Icon
} from 'native-base';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      user: '',
      pass: '',
    };
    this.showPass = this.showPass.bind(this);
  }

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }

  // updateUsername(value) {
  //   this.setState({
  //     username: value
  //     }, () => {
  //         this.updateLoginInfo();
  //     });
  // }

  // updatePassword(value) {
  //   this.setState({
  //     password: value
  //     }, () => {
  //         this.updateLoginInfo();
  //     });   
  // }

  componentDidUpdate() {
    const userText = this.state.user;
    const passText = this.state.pass;
    this.props.loginInfoCatch(userText, passText);
  }

  render() {
    return (
      <Form>
      <Item>
          <Icon active name="contact" />
          <Input           
          placeholder="Usuario" 
          onChangeText={(text) => this.setState({ user: text })} keyboardType='email-address'
          />
      </Item>
      <Item>
          <Icon active name="lock" />
          <Input
          secureTextEntry={true}
          text={this.state.password} 
          placeholder="Contraseña" 
          onChangeText={(text) => this.setState({ pass: text })} keyboardType='default'
          />          
      </Item>
      </Form>
    );
  }
}
