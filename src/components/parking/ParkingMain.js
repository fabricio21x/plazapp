import React, { Component } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import {
  Text,
  Header,
  Container,
  Body,
  Left,
  Right,
  Button,
  Icon,
  Title,
  Toast,
  Content,
  ListItem,
  Thumbnail,
  List
} from 'native-base';
import Loader from './Loader';
import { getUserToken } from '../../utils/storage';
//import Menu from '../landing/Menu';

class ParkingMain extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      parkingPlaces: [],
      loading: true,
      userParked: false,
      usrToken: '',
      user_place: {},
      parked_time: ''
    };
  }

  componentWillMount() {
    getUserToken().then(this.getData);
  }

  getData = async token => {
    axios
      .get('http://200.16.7.150:8083/api/v1/users/me', {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      .then(response => {
        axios
          .get('http://200.16.7.150:8083/api/v1/parking_lots/', {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
              Accept: 'application/json'
            }
          })
          .then(res =>
            this.setState({
              usrToken: token,
              user: response.data.user,
              loading: false,
              parkingPlaces: res.data.parking_lots,
              userParked: response.data.user.flag_park ? response.data.user.flag_park : false
            })
          );
      });
  };

  updateView(parkingId) {
    this.setState({ userParked: true, parkingData: parkingId });
  }

  navigateToLevels(parkingLot) {
    this.props.navigation.navigate('ParkingLevels', {
      selectedParking: parkingLot,
      usrToken: this.state.usrToken
    });
  }

  calcDifference(start) {
    const temp = new Date();
    const now = new Date(0, 0, 0, temp.getHours(), temp.getMinutes());

    const ms = now - start;

    let hours = Math.floor((ms / (1000 * 60 * 60)) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes}`;
  }

  mod(n, m) {
    return ((n % m) + m) % m;
  }

  showParkedMessage() {
    const lotId = this.state.user_place.parking_lot_id;
    const pl = this.state.parkingPlaces.filter(item => item.id == lotId)[0];
    console.log(lotId);
    console.log(pl);

    const up = this.state.user_place;
    const hour = up.start_time.split(':');
    const localHour = this.mod(parseInt(hour[0], 10) - 5, 24);
    const start = new Date(0, 0, 0, localHour, hour[1]);
    const parkedTime = this.calcDifference(start);
    if (this.state.parked_time != parkedTime) {
      this.setState({ user_place: up, parked_time: parkedTime });
    }
    Alert.alert(
      pl.name,
      `\nLugar: ${up.parking_place_id}\n
          Hora de entrada: ${localHour}:${hour[1]}\n
          Tiempo transcurrido: ${parkedTime}`
    );
  }

  renderParkingPlaces() {
    return this.state.parkingPlaces.map(parkingLot => (
      <ListItem style={styles.listItem} button onPress={() => this.navigateToLevels(parkingLot)}>
        <Thumbnail size={80} source={{ uri: parkingLot.url_image }} />
        <Body>
          <Text style={styles.textStyle}>{parkingLot.name}</Text>
          <Text note>Libres: {parkingLot.occupied}</Text>
          <Text note>Ocupados: {parkingLot.free}</Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    ));
  }

  renderBottom() {
    if (this.state.userParked) {
      axios
        .get(`http://200.16.7.150:8083/api/v1/user_places/${this.state.user.id}/search`, {
          headers: {
            Authorization: this.state.usrToken,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        })
        .then(resp => {
          const r = resp.data.user_places;
          const up = r[r.length - 1];
          const hour = up.start_time.split(':');
          const localHour = this.mod(parseInt(hour[0], 10) - 5, 24);
          const start = new Date(0, 0, 0, localHour, hour[1]);
          const parkedTime = this.calcDifference(start);
          console.log('renderBottom');
          if (this.state.parked_time != parkedTime) {
            this.setState({ user_place: up, parked_time: parkedTime });
          }
        });

      return (
        <Button
          iconLeft
          full
          style={{ backgroundColor: '#34A34F', height: 60 }}
          onPress={() => this.showParkedMessage()}
        >
          <Icon name="car" />
          <Text>Usuario parqueado ({this.state.parked_time})</Text>
        </Button>
      );
    }
    return (
      <Button
        iconLeft
        full
        style={{ height: 60 }}
        onPress={() =>
          this.props.navigation.navigate('ScanQR', {
            userData: this.state.user,
            onGoBack: id => this.updateView(id)
          })
        }
      >
        <Icon name="qr-scanner" />
        <Text>Escanear QR</Text>
      </Button>
    );
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
          <Loader loading={this.state.loading} />
          <List>{this.renderParkingPlaces()}</List>
        </Content>
        {this.renderBottom()}
      </Container>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 16,
    textAlign: 'left'
  }
};

export default ParkingMain;
