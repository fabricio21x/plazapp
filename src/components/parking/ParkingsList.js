import React, { Component } from 'react';
import { Text, Body, Right, Icon, List, Thumbnail, ListItem, Toast } from 'native-base';
import axios from 'axios';
import { getUserToken } from '../../utils/storage';
import Loader from './Loader';

class ParkingsList extends Component {
  constructor(props) {
    super(props);
    this.state = { parkingPlaces: this.props.parkingPlaces };
  }

  navigateToLevels(parkingLot) {
    if (parkingLot.free === 0) {
      Toast.show({
        text: 'Lo sentimos, el estacionamiento seleccionado no cuenta con espacios libres',
        buttonText: 'Ok',
        buttonTextStyle: { color: '#ff00d4' },
        duration: 2500
      });
    } else {
      this.props.navigation.navigate('ParkingLevels', { selectedParking: parkingLot });
    }
  }

  renderParkingPlaces() {
    return this.state.parkingPlaces.map(parkingLot => (
      <ListItem style={styles.listItem} button onPress={() => this.navigateToLevels(parkingLot)}>
        <Thumbnail size={80} source={{ uri: parkingLot.url_image }} />
        <Body>
          <Text style={styles.textStyle}>{parkingLot.description}</Text>
          <Text note>Libres: {parkingLot.free}</Text>
          <Text note>Ocupados: {parkingLot.occupied}</Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    ));
  }

  render() {
    return <List>{this.renderParkingPlaces()}</List>;
  }
}

const styles = {
  listItem: {
    paddingTop: 15,
    paddingBottom: 15
  },
  iconStyle: {
    width: 60
  },
  textStyle: {
    textAlign: 'left'
  }
};

export default ParkingsList;
