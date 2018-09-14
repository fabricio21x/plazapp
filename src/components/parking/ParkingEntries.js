import React, { Component } from 'react';
import { ListView } from 'react-native';
import {
  Text,
  Body,
  Right,
  Icon,
  ListItem,
  Thumbnail,
  Container,
  Left,
  Content,
  Button,
  Title,
  Header
} from 'native-base';
import axios from 'axios';
import Loader from './Loader';

class ParkingEntries extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      selectedParking: this.props.navigation.getParam('selectedParking', {}),
      selectedZone: this.props.navigation.getParam('selectedZone', {}),
      selectedLevel: this.props.navigation.getParam('selectedLevel', {}),
      zones: this.props.navigation.getParam('zones', []),
      zones_points: [],
      loading: true,
      basic: true,
      parkingEntries: [],
      usrToken: this.props.navigation.getParam('usrToken', '')
    };
  }

  componentWillMount() {
    axios
      .get(`http://200.16.7.150:8083/api/v1/road_dots/${this.state.selectedParking.id}/search`, {
        headers: {
          Authorization: this.state.usrToken,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      .then(response => {
        axios
          .get(
            `http://200.16.7.150:8083/api/v1/park_zone_dots/${
              this.state.selectedLevel.id
            }/search_by_level`,
            {
              headers: {
                Authorization: this.state.usrToken,
                'Content-Type': 'application/json',
                Accept: 'application/json'
              }
            }
          )
          .then(res => {
            this.setState({
              loading: false,
              parkingEntries: response.data.road_dots,
              zones_points: res.data.park_zone_dots
            });
          });
      });
  }

  renderParkingEntries() {
    return this.state.parkingEntries.map(parkingEntry => (
      <ListItem
        style={styles.listItem}
        button
        onPress={() =>
          this.props.navigation.navigate('ParkingPath', {
            selectedZone: this.state.selectedZone,
            selectedEntry: parkingEntry,
            selectedLevel: this.state.selectedLevel,
            usrToken: this.state.usrToken,
            zones: this.state.zones,
            zones_points: this.state.zones_points
          })
        }
      >
        <Thumbnail
          size={80}
          source={{
            uri: 'http://www.displayme.com.au/assets/thumbL/SIGN-0083-A3.jpg'
          }}
        />
        <Body>
          <Text style={styles.textStyle}>{parkingEntry.name}</Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    ));
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
            <Title style={styles.textStyle}>Entradas</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Loader loading={this.state.loading} />
          {this.renderParkingEntries()}
        </Content>
      </Container>
    );
  }
}

const styles = {
  listItem: {
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15
  },
  textTitleStyle: {
    textAlign: 'left'
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center'
  }
};

export default ParkingEntries;
