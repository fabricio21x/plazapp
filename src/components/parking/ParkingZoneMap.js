import React, { Component } from 'react';
import { Image, Dimensions, Platform } from 'react-native';
//import { CachedImage, ImageCacheProvider } from 'react-native-cached-image';
import {
  Header,
  Container,
  Body,
  Left,
  Right,
  Button,
  Icon,
  Title,
  View,
  Fab,
  Subtitle,
  ActionSheet
} from 'native-base';
import ImageZoom from 'react-native-image-pan-zoom';
import Loader from './Loader';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const HEIGHT_OFFSET = Platform.OS === 'ios' ? (height === 812 ? 89 : 64) : 56;
const ICON_PADDING = Platform.OS === 'ios' ? 4 : 0;

class ParkingZoneMap extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      active: false,
      selectedZone: this.props.navigation.getParam('selectedZone', {}),
      parkingLevels: this.props.navigation.getParam('levels', []),
      selectedLevel: this.props.navigation.getParam('selectedLevel', {}),
      zones: this.props.navigation.getParam('zones', []),
      selectedParking: this.props.navigation.getParam('selectedParking', {}),
      usrToken: this.props.navigation.getParam('usrToken', ''),
      cancel_index: this.props.navigation.getParam('zones', {}).length,
      cancel_index_entry: 0,
      cancel_index_level: this.props.navigation.getParam('levels', []).length,
      parkingEntries: [],
      zones_points: []
    };
  }

  componentWillMount() {
    this.getEntries();
  }

  componentDidUpdate() {
    if (this.state.loading) this.getEntries();
  }

  getEntries() {
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
              zones_points: res.data.park_zone_dots,
              cancel_index_entry: response.data.road_dots.length
            });
          });
      });
  }

  generateRoute() {
    const opt = this.state.parkingEntries.map(item => item.name);
    opt.push('Cancelar');
    return (
      <Button
        style={{ backgroundColor: '#f48042' }}
        onPress={() =>
          ActionSheet.show(
            {
              options: opt,
              cancelButtonIndex: this.state.cancel_index_entry,
              title: 'Seleccione una entrada'
            },
            buttonIndex => {
              if (buttonIndex != this.state.cancel_index_entry) {
                this.props.navigation.navigate('ParkingPath', {
                  selectedZone: this.state.selectedZone,
                  selectedEntry: this.state.parkingEntries[buttonIndex],
                  selectedLevel: this.state.selectedLevel,
                  usrToken: this.state.usrToken,
                  zones: this.state.zones,
                  zones_points: this.state.zones_points
                });
              }
            }
          )
        }
      >
        <View style={styles.levelButtonView}>
          <Icon name="md-navigate" style={{ transform: [{ rotate: '45deg' }], color: 'white' }} />
        </View>
      </Button>
    );
  }

  renderLevelsList() {
    const currLvl = this.state.parkingLevels.indexOf(this.state.selectedLevel);
    const opt = this.state.parkingLevels.map(item => item.name);
    opt.push('Cancelar');
    return (
      <Button
        style={{ backgroundColor: '#f4425c' }}
        onPress={() =>
          ActionSheet.show(
            {
              options: opt,
              cancelButtonIndex: this.state.cancel_index_level,
              title: 'Seleccione un nivel'
            },
            buttonIndex => {
              if (buttonIndex != this.state.cancel_index_level) {
                axios
                  .get(
                    `http://200.16.7.150:8083/api/v1/park_zones/${
                      this.state.parkingLevels[buttonIndex].id
                    }/search`,
                    {
                      headers: {
                        Authorization: this.state.usrToken,
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                      }
                    }
                  )
                  .then(response =>
                    this.setState({
                      loading: true,
                      zones: response.data.park_zones,
                      cancel_index: response.data.park_zones.length,
                      selectedZone: response.data.park_zones[0],
                      selectedLevel: this.state.parkingLevels[buttonIndex]
                    })
                  );
              }
            }
          )
        }
      >
        <View style={styles.levelButtonView}>
          <Icon name="md-flag" style={{ color: 'white' }} />
        </View>
      </Button>
    );
  }

  renderZonesList() {
    const currZone = this.state.zones.indexOf(this.state.selectedZone) + 1;
    const opt = this.state.zones.map(item => item.description);
    opt.push('Cancelar');
    return (
      <Button
        style={{ backgroundColor: '#52AB85' }}
        onPress={() =>
          ActionSheet.show(
            {
              options: opt,
              cancelButtonIndex: this.state.cancel_index,
              title: 'Seleccione una zona'
            },
            buttonIndex => {
              if (buttonIndex != this.state.cancel_index && buttonIndex != currZone - 1) {
                this.setState({
                  selectedZone: this.state.zones[buttonIndex]
                });
              }
            }
          )
        }
      >
        <View style={styles.levelButtonView}>
          <Icon name="md-locate" style={{ color: 'white' }} />
        </View>
      </Button>
    );
  }

  render() {
    const IMG_HEIGHT = height;
    const IMG_WIDTH =
      (height * this.state.selectedZone.image_width) / this.state.selectedZone.image_height;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title style={styles.textStyle}>{this.state.selectedZone.description}</Title>
            <Subtitle>Mapa</Subtitle>
          </Body>
          <Right />
        </Header>
        <Container>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Image
                style={{ flex: 1, height: undefined, width: undefined }}
                source={{ uri: this.state.selectedZone.url_image }}
                onLoadStart={e => this.setState({ loading: true })}
                onLoadEnd={e => this.setState({ loading: false })}
                resizeMode="contain"
              />
              <Loader loading={this.state.loading} />
              {/* <ImageZoom
                cropWidth={width}
                cropHeight={height}
                imageWidth={IMG_WIDTH}
                imageHeight={IMG_HEIGHT}
                centerOn={{ x: 0, y: 0, scale: 0.3 }}
                enableSwipeDown={false}
                panToMove={false}
                //swipeDownThreshold={-1}
                style={{ backgroundColor: 'white' }}
              >
                <ImageCacheProvider
                  style={{
                    width: IMG_WIDTH,
                    height: IMG_HEIGHT
                  }}
                  urlsToPreload={[this.state.selectedZone.url_image]}
                >
                  <CachedImage
                    source={{ uri: this.state.selectedZone.url_image }}
                    resizeMode="contain"
                    onLoadStart={e => this.setState({ loading: true })}
                    onLoadEnd={e => this.setState({ loading: false })}
                    style={{
                      width: IMG_WIDTH,
                      height: IMG_HEIGHT
                    }}
                  />
                </ImageCacheProvider>
                <Loader loading={this.state.loading} />
              </ImageZoom> */}
            </View>
            <Fab
              style={{ zIndex: 15 }}
              active={this.state.active}
              direction="down"
              containerStyle={{}}
              style={{ backgroundColor: '#5067FF' }}
              position="topRight"
              onPress={() => this.setState({ active: !this.state.active })}
            >
              <Icon name="more" />
              {this.renderZonesList()}
              {this.renderLevelsList()}
              {this.generateRoute()}
            </Fab>
          </View>
        </Container>
      </Container>
    );
  }
}

const styles = {
  viewStyle: {
    height: 60,
    paddingTop: 20,
    paddingBottom: 20
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'left'
  },
  levelButtonView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  levelButtonNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    width: '100%',
    paddingRight: ICON_PADDING
  },
  levelButtonText: {
    fontSize: 11,
    textAlign: 'center',
    color: 'white',
    width: '100%',
    paddingRight: ICON_PADDING
  }
};

export default ParkingZoneMap;
