import React, { Component } from 'react';
import { ImageBackground, Dimensions, Platform } from 'react-native';
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image';
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
  View,
  Fab,
  Subtitle,
  Content,
  ActionSheet
} from 'native-base';
import ImageZoom from 'react-native-image-pan-zoom';
import Loader from './Loader';
import axios from 'axios';
import DrawParkSvg from './DrawParkSvg';

const { width, height } = Dimensions.get('window');

const HEIGHT_OFFSET = Platform.OS === 'ios' ? (height === 812 ? 89 : 64) : 56;
const ICON_PADDING = Platform.OS === 'ios' ? 4 : 0;

class ParkingLevelMap extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      active: false,
      selectedLevel: this.props.navigation.getParam(
        'selectedLevel',
        this.props.navigation.getParam('levels', {})[0]
      ),
      levels: this.props.navigation.getParam('levels', {}),
      cancel_index: this.props.navigation.getParam('levels', {}).length,
      usrToken: this.props.navigation.getParam('usrToken', {}),
      zones_points: [],
      zones: []
    };
  }

  componentDidMount() {
    this.getPoints();
  }

  componentDidUpdate() {
    if (this.state.loading) this.getPoints();
  }

  getPoints() {
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
      .then(response => {
        axios
          .get(`http://200.16.7.150:8083/api/v1/park_zones/${this.state.selectedLevel.id}/search`, {
            headers: {
              Authorization: this.state.usrToken,
              'Content-Type': 'application/json',
              Accept: 'application/json'
            }
          })
          .then(res => {
            this.setState({
              zones: res.data.park_zones,
              zones_points: response.data.park_zone_dots,
              loading: false
            });
          });
      });
  }

  renderLevelsList() {
    let currLvl = this.state.selectedLevel.value;
    if (currLvl < 0) currLvl *= -1;
    currLvl += 1;
    const opt = this.state.levels.map(item => item.name);
    opt.push('Cancelar');
    return (
      <Button
        style={{ backgroundColor: '#52AB85' }}
        onPress={() =>
          ActionSheet.show(
            {
              options: opt,
              cancelButtonIndex: this.state.cancel_index,
              title: 'Seleccione un nivel'
            },
            buttonIndex => {
              if (buttonIndex != this.state.cancel_index && buttonIndex != currLvl - 1) {
                this.setState({
                  selectedLevel: this.state.levels[buttonIndex],
                  loading: true
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

  renderLevelName(parkingLevel) {
    if (parkingLevel.value < 0) {
      return (
        <Body style={{ flex: 3 }}>
          <Title style={styles.textStyle}>Sótano {parkingLevel.value * -1}</Title>
          <Subtitle>Mapa</Subtitle>
        </Body>
      );
    }
    return (
      <Body style={{ flex: 3 }}>
        <Title style={styles.textStyle}>Piso {parkingLevel.value}</Title>
        <Subtitle>Mapa</Subtitle>
      </Body>
    );
  }

  render() {
    const IMG_HEIGHT = height;
    const IMG_WIDTH =
      (height * this.state.selectedLevel.image_width) / this.state.selectedLevel.image_height;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title style={styles.textStyle}>{this.state.selectedLevel.name}</Title>
            <Subtitle>Mapa</Subtitle>
          </Body>
          <Right />
        </Header>
        <Container>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <ImageZoom
                cropWidth={width}
                cropHeight={height - HEIGHT_OFFSET}
                imageWidth={IMG_WIDTH}
                imageHeight={IMG_HEIGHT}
                centerOn={{ x: 0, y: 0, scale: 1.00001 }}
                enableSwipeDown
                swipeDownThreshold={-1}
                style={{ backgroundColor: 'white' }}
              >
                <ImageCacheProvider
                  style={{
                    width: IMG_WIDTH,
                    height: IMG_HEIGHT,
                    position: 'absolute'
                  }}
                  urlsToPreload={[this.state.selectedLevel.url_image]}
                >
                  <CachedImage
                    source={{ uri: this.state.selectedLevel.url_image }}
                    resizeMode="contain"
                    onLoadStart={e => this.setState({ loading: true })}
                    onLoadEnd={e => this.setState({ loading: false })}
                    style={{
                      width: IMG_WIDTH,
                      height: IMG_HEIGHT,
                      position: 'absolute'
                    }}
                  />
                </ImageCacheProvider>
                <Loader loading={this.state.loading} />
                <DrawParkSvg
                  width={IMG_WIDTH}
                  height={IMG_HEIGHT}
                  zoneLimits={this.state.zones_points}
                  zones={this.state.zones}
                  myPositionLimits={null}
                  path={null}
                  myPosition={null}
                  drawStore
                  drawPath={false}
                  drawMyPosition={false}
                  style={{ position: 'absolute', top: 0, left: 0, backgroundColor: 'yellow' }}
                />
              </ImageZoom>
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
              {this.renderLevelsList()}
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
  pathStyle: {
    position: 'absolute',
    zIndex: 99,
    alignSelf: 'center'
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

export default ParkingLevelMap;
