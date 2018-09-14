import React, { Component } from 'react';
import { ListView } from 'react-native';
import {
  Text,
  Body,
  Right,
  Icon,
  List,
  ListItem,
  Thumbnail,
  Container,
  Left,
  Content,
  Button,
  Title,
  Header,
  Toast,
  Subtitle
} from 'native-base';
import axios from 'axios';
import Loader from './Loader';

class ParkingLevels extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      loading: true,
      basic: true,
      parkingLevels: [],
      usrToken: this.props.navigation.getParam('usrToken', '')
    };
  }

  componentWillMount() {
    const pl = this.props.navigation.getParam('selectedParking', {});
    axios
      .get(`http://200.16.7.150:8083/api/v1/parking_levels/${pl.id}/search`, {
        headers: {
          Authorization: this.state.usrToken,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
      .then(response =>
        this.setState({ loading: false, parkingLevels: response.data.parking_levels })
      );
  }

  navigateToZone(parking, level) {
    // if (level.free === 0) {
    //   Toast.show({
    //     text: 'El nivel seleccionado no cuenta con espacios libres',
    //     buttonText: 'Ok',
    //     buttonTextStyle: { color: '#ff00d4' },
    //     duration: 2500
    //   });
    // } else {
    this.props.navigation.navigate('ParkingZones', {
      selectedParking: parking,
      selectedLevel: level,
      levels: this.state.parkingLevels,
      usrToken: this.state.usrToken
    });
    //}
  }

  renderLevelName(parkingLevel) {
    if (parkingLevel.level_order < 0) {
      return <Text style={styles.textTitleStyle}>Sótano {parkingLevel.level_order * -1}</Text>;
    }
    return <Text style={styles.textTitleStyle}>Piso {parkingLevel.level_order}</Text>;
  }

  renderParkingLevels(parkingLevel) {
    const pl = this.props.navigation.getParam('selectedParking', {});
    return (
      <ListItem
        style={styles.listItem}
        button
        onPress={() => this.navigateToZone(pl, parkingLevel)}
      >
        <Thumbnail size={80} source={{ uri: pl.url_image }} />
        <Body>
          <Text style={styles.textTitleStyle}>{parkingLevel.name}</Text>
          <Text note>Libres: {parkingLevel.occupied}</Text>
          <Text note>Ocupados: {parkingLevel.free}</Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }

  render() {
    const pl = this.props.navigation.getParam('selectedParking', {});
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title style={styles.textStyle}>Niveles</Title>
            <Subtitle>{pl.name}</Subtitle>
          </Body>
          <Right />
        </Header>
        <Content>
          <Loader loading={this.state.loading} />
          <List
            dataSource={this.ds.cloneWithRows(this.state.parkingLevels)}
            renderRow={item => this.renderParkingLevels(item)}
            renderLeftHiddenRow={item => (
              <Button
                style={{ flexDirection: 'column' }}
                onPress={() =>
                  this.props.navigation.navigate('ParkingLevelMap', {
                    levels: this.state.parkingLevels,
                    selectedLevel: item,
                    usrToken: this.state.usrToken
                  })
                }
              >
                <Text>Mapa</Text>
                <Icon type="FontAwesome" name="map" />
              </Button>
            )}
            leftOpenValue={75}
            closeOnRowBeginSwipe={this.state.basic}
          />
        </Content>

        <Button
          full
          iconRight
          style={{ backgroundColor: '#f45642', height: 60 }}
          onPress={() =>
            this.props.navigation.navigate('ParkingLevelMap', {
              selectedParking: this.selectedParking,
              levels: this.state.parkingLevels,
              selectedLevel: this.state.parkingLevels[0],
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

export default ParkingLevels;
