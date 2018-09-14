import React, { Component } from 'react';
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
  Content,
  List,
  ListItem,
  Thumbnail,
  Subtitle
} from 'native-base';
import axios from 'axios';
import Loader from './Loader';

class ParkingZones extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedParking: this.props.navigation.getParam('selectedParking', {}),
      loading: true,
      parkingZones: [],
      levels: this.props.navigation.getParam('levels', []),
      selectedLevel: this.props.navigation.getParam('selectedLevel', {}),
      usrToken: this.props.navigation.getParam('usrToken', '')
    };
  }

  componentWillMount() {
    axios
      .get(`http://200.16.7.150:8083/api/v1/park_zones/${this.state.selectedLevel.id}/search`, {
        headers: {
          Authorization: this.state.usrToken,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      .then(response => this.setState({ loading: false, parkingZones: response.data.park_zones }));
  }

  renderZonesList() {
    return this.state.parkingZones.map(zone => (
      <ListItem
        button
        style={styles.listItem}
        button
        onPress={() =>
          this.props.navigation.navigate('ParkingZoneMap', {
            selectedZone: zone,
            levels: this.state.levels,
            zones: this.state.parkingZones,
            selectedParking: this.state.selectedParking,
            selectedLevel: this.state.selectedLevel,
            usrToken: this.state.usrToken
          })
        }
      >
        <Thumbnail
          size={80}
          source={{
            uri:
              'https://logoobject.com/wp-content/uploads/2017/11/Free-Car-Logo-Design-Idea-999x999.png'
          }}
        />
        <Body style={{ flex: 3 }}>
          <Text style={styles.textStyle}>{zone.description}</Text>
          <Text note>Libres: {zone.occupied}</Text>
          <Text note>Ocupados: {zone.free}</Text>
        </Body>
        <Right>{/* <Icon name="arrow-forward" /> */}</Right>
      </ListItem>
    ));
  }

  render() {
    const lvls = this.props.navigation.getParam('levels', {});
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title style={styles.textStyle}>Zonas</Title>
            <Subtitle>{this.state.selectedLevel.name}</Subtitle>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>
        <Content>
          <Loader loading={this.state.loading} />
          <List>{this.renderZonesList()}</List>
        </Content>
        <Button
          full
          iconRight
          style={{ backgroundColor: '#f45642', height: 60 }}
          onPress={() =>
            this.props.navigation.navigate('ParkingLevelMap', {
              selectedParking: this.selectedParking,
              levels: lvls,
              selectedLevel: this.state.selectedLevel,
              usrToken: this.state.usrToken
            })
          }
        >
          <Icon name="map" />
          <Text>Ver mapa</Text>
        </Button>
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

export default ParkingZones;
