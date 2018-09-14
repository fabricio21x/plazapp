import React, { Component } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Body,
  Title,
  Right,
  Button,
  Icon,
  Text,
  Left
} from 'native-base';
import { setUserToken } from '../../utils/storage';
import { API_HEADERS } from '../../constants/config';
import CardSection from './CardSection';

import axios from 'axios';

export default class BodyRegister extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      pressedButton: false,
      loading: 'initial',
    };
  }

  createSessionToken() {
    const { navigate } = this.props.navigation;
    const userInfo = {
      email: this.state.email,
      password: this.state.password
    };

    console.log('INGRESO??');
    axios
      .post('http://200.16.7.150:8083/api/v1/sessions', userInfo, { headers: API_HEADERS })
      .then(res => {
        setUserToken(res.data.session.access_token)
        .then(() => {
          console.log('SIIII CREANDO TOKEN');
          navigate('Preference');
        }); 
      })
      .catch(error => {
        Alert.alert('Ha ocurrido un error: ', '' + error);
        console.log(`ERROR2 : ${error}`);
      });
  }

  createNewUser() {
    const userInfo = {
      // Usamos el formato del body del post
      user: {
        email: this.state.email,
        password: this.state.password
      }
    };

    axios
      .post('http://200.16.7.150:8083/api/v1/users', userInfo, { headers: API_HEADERS })
      .then(res => {
        this.setState({ pressedButton: true });
        console.log(res.data);
        this.createSessionToken();
      }) 
      .catch(error => {
        Alert.alert('Ha ocurrido un error: ', '' + error);
        console.log(`ERROR1 : ${error}`);
        console.log(error);
      });
  }

  myBodyRegister = () => {
    Alert.alert('Confirmacion de correo', this.state.email, [
      {
        text: 'Aceptar',
        onPress: this.aceptar.bind(this)
      },
      {
        text: 'Cancelar'
      }
    ]);
  };

  aceptar() {
    this.createNewUser();
  }

  cancelar() {
    // nada
  }

  formSection() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title style={{ fontSize: 15, padding: 10 }}>Registro de Usuarios</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Form>
            <Item floatingLabel>
              <Label>Correo</Label>
              <Input
                onChangeText={email => {
                  this.setState({ email });
                }}
                value={this.state.text}
                keyboardType="email-address"
              />
            </Item>
            <Item floatingLabel last>
              <Label>Contraseña</Label>
              <Input
                onChangeText={password => {
                  this.setState({ password });
                }}
                value={this.state.text}
                keyboardType="default"
                secureTextEntry
              />
            </Item>
            <Button iconLeft full style={{ marginTop: 40 }} onPress={this.myBodyRegister}>
              <Icon name="ios-person-add" />
              <Text>Confirmar registro</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }

  keyboardSection() {
    console.log(Platform.OS);
    if (!(Platform.OS === 'android')) {
      return (
        <KeyboardAvoidingView style={styles.containerStyle} behavior="padding">
          {this.formSection()}
        </KeyboardAvoidingView>
      );
    }
    return <Container style={styles.containerStyle}>{this.formSection()}</Container>;
  }

  render() {
    return this.keyboardSection();
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, heigth: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
});
