'use strict';

import React, { Component } from 'react';

import { StyleSheet, Alert } from 'react-native';
import {
  Button,
  Text,
  Container,
  Header,
  Left,
  Icon,
  Body,
  Title,
  Right,
  Content
} from 'native-base';
import axios from 'axios';
import Loader from './Loader';
import { getUserToken } from '../../utils/storage';

import QRCodeScanner from 'react-native-qrcode-scanner';

class ScanQR extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      qrData: '',
      loading: false,
      renderMessage: false,
      userData: this.props.navigation.getParam('userData', {})
    };
  }

  onSuccess(e) {
    //[{ text: 'Ok' }, { text: 'Escanear de nuevo' }]
    // Alert.alert('Lectura exitosa', e.data, [
    //   {
    //     text: 'Ok',
    //     onPress: () => this.setState({ renderMessage: true, qrData: e.data })
    //   }
    // ]);
    this.setState({ renderMessage: true, qrData: e.data });
  }

  confirmParking() {
    Alert.alert(
      'Confirmación de parqueo',
      `Uso del estacionamiento ${this.state.qrData} confirmado`
    );
    this.props.navigation.state.params.onGoBack(this.state.qrData);
    this.props.navigation.goBack();
  }

  handleConfirmation() {
    getUserToken().then(this.postReservation);
  }

  postReservation = async token => {
    this.setState({ loading: true });
    axios
      .post(
        'http://200.16.7.150:8083/api/v1/user_places',
        {
          user_place: {
            user_id: this.state.userData.id,
            parking_place_id: this.state.qrData
          }
        },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
      )
      .then(res => {
        console.log(res);
        this.setState({ loading: false });
        this.confirmParking();
      });
  };

  renderBottom() {
    if (this.state.renderMessage) {
      return (
        <Button
          iconRight
          full
          style={{ backgroundColor: '#34A34F', height: 60 }}
          onPress={() => this.handleConfirmation()}
        >
          <Icon name="checkmark" />
          <Text>Confirmar estacionamiento {this.state.qrData}</Text>
        </Button>
      );
    }
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title style={styles.textStyle}>Estacionamientos</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          {/* <Loader loading={this.state.loading} /> */}
          <QRCodeScanner
            onRead={this.onSuccess.bind(this)}
            topContent={
              <Text style={styles.centerText}>
                Enfoque el código QR que se encuentra en el lugar de estacionamiento
              </Text>
            }
          />
        </Content>
        {this.renderBottom()}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'left'
  }
});

export default ScanQR;
