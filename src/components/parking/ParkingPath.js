import React, { Component } from 'react';
import { Dimensions, Platform } from 'react-native';
import { CachedImage, ImageCacheProvider } from 'react-native-cached-image';
import {
  Header,
  Container,
  Left,
  Right,
  Button,
  Icon,
  View,
  Content,
  Title,
  Subtitle,
  Body,
  Fab
} from 'native-base';
import axios from 'axios';
import ImageZoom from 'react-native-image-pan-zoom';

import { Svg, Line } from 'react-native-svg';
import { getUserToken } from '../../utils/storage';
import Loader from './Loader';
import DrawParkSvg from './DrawParkSvg';

const { width, height } = Dimensions.get('window');

const HEIGHT_OFFSET = Platform.OS === 'ios' ? (height === 812 ? 89 : 64) : 56;

class ParkingPath extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      basic: true,
      selectedZone: this.props.navigation.getParam('selectedZone', {}),
      selectedEntry: this.props.navigation.getParam('selectedEntry', {}),
      selectedLevel: this.props.navigation.getParam('selectedLevel', {}),
      zones: this.props.navigation.getParam('zones', []),
      zones_points: this.props.navigation.getParam('zones_points', []),
      usrToken: this.props.navigation.getParam('usrToken', {}),
      parkingPath: {}
    };
  }

  componentDidMount() {
    axios
      .get(
        `http://200.16.7.150:8083/api/v1/road_dots/generate_route?entry_id=${
          this.state.selectedEntry.id
        }&zone_id=${this.state.selectedZone.id}`,
        {
          headers: {
            Authorization: this.state.usrToken,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
      )
      .then(response => {
        this.setState({ loading: false, parkingPath: response.data.parking_path[0] });
      });
  }

  render() {
    const IMG_HEIGHT = height;
    const IMG_WIDTH =
      (height * this.state.selectedLevel.image_width) / this.state.selectedLevel.image_height;
    console.log('parkingPath: ', this.state.parkingPath);
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
            <Subtitle>Ruta generada</Subtitle>
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
                  path={this.state.parkingPath.node_list}
                  entry={this.state.selectedEntry}
                  drawStore
                  drawPath={!!this.state.parkingPath.node_list}
                  drawEntry
                  style={{ position: 'absolute', top: 0, left: 0, backgroundColor: 'yellow' }}
                />
              </ImageZoom>
            </View>
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
  iconStyle: {
    fontSize: 30,
    textAlign: 'center',
    color: 'red'
  },
  titleStyle: {
    zIndex: 10,
    position: 'absolute',
    color: 'black',
    textAlign: 'left'
  }
};

export default ParkingPath;
