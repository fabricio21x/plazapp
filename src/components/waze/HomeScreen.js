import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  Keyboard,
  ImageBackground,
  Alert,
  Platform
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Text,
  Title,
  Item,
  Input,
  Root,
  ActionSheet,
  View,
  Fab,
  Button,
  Icon,
  Toast
} from 'native-base';

import { connect } from 'react-redux';
import ImageZoom from 'react-native-image-pan-zoom';
import { loadMaps } from '../../actions/maps';
import { loadStoreInfo } from '../../actions/storeInfo';
import { loadRoute } from '../../actions/routes';
import DrawSvg from './DrawSvg';
import Loader from './../parking/Loader';

import { CachedImage, ImageCacheProvider } from 'react-native-cached-image';

//const BUTTONS = ['Nivel 1', 'Nivel 2', 'Cancel'];
//const BUTTONS = [];
//const CANCEL_INDEX = 2;
const { width, height } = Dimensions.get('window');

const HEIGHT_OFFSET = Platform.OS === 'ios' ? (height === 812 ? 89 : 64) : 56;
const ICON_COG = Platform.OS === 'ios' ? 'ios-cog' : 'md-cog';
const ICON_PADDING = Platform.OS === 'ios' ? 4 : 0;
const STORE_TYPE = 0;
const MY_LOCATION_TYPE = 1;

class HomeScreen extends Component {
  componentWillMount() {
    this.props.dispatch(loadMaps());
    ActionSheet.actionsheetInstance = null;
    const id_store_mkt = this.props.navigation.state.params;
    if (id_store_mkt) this.props.dispatch(loadStoreInfo(id_store_mkt.idStore));
  }
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.props.storeInfo.storeInfo = []; //reset
    this.state = {
      options: false,
      store_info: '',
      levels: [],
      buttons: [],
      acsensorChk: false,
      escaleraChk: false,
      escaleraElecChk: false,
      loading_map: true,
      show_location: false,
      current_level: 1,
      store_location_level: '',
      my_location_level: '',
      my_location: '',
      my_location_limit_points: '',
      store_access_points: '',
      store_mall_element_id: '',
      my_location_mall_element_id: '',
      request_type: STORE_TYPE,
      store_limit_points: '',
      selected_level: 1,
      route_path: '',
      show_route_path: false,
      mall_element_selected: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { maps } = nextProps.maps;
    const buttons_list = [];
    if (maps.length) {
      for (let i = 0; i < maps.length; i++) {
        buttons_list.push(`Nivel ${(i + 1).toString()}`);
      }
    }
    buttons_list.push('Cancel');

    this.setState({
      buttons: buttons_list,
      cancel_index: maps.length
    });
    const { storeInfo } = nextProps.storeInfo;
    const { route } = nextProps.route;
    let selected_level = this.state.selected_level;
    const current_level = this.state.current_level;
    const my_location_level = this.state.my_location_level;

    if (storeInfo.mall_level_id && maps.length) {
      if (!this.state.request_type) {
        const l = maps.find(element => element.id == storeInfo.mall_level_id);
        if (l) selected_level = l.level;
        if (!this.state.mall_element_selected) {
          this.setState({
            store_mall_element_id: storeInfo.id,
            store_limit_points: storeInfo.limit_points,
            store_access_points: storeInfo.access_points,
            store_location_level: selected_level
          });
        }
      } else {
        this.setState({
          my_location_mall_element_id: storeInfo.id,
          my_location_limit_points: storeInfo.limit_points,
          my_location: storeInfo.access_points[0],
          my_location_level: selected_level
        });
      }
      const change_level = current_level != selected_level;
      this.setState({ loading_map: change_level });
    }

    if (route.length) {
      this.setState({ route_path: route });
    }

    if (maps.length) {
      this.setState({ levels: maps });
      const current = this.state.show_route_path ? this.state.my_location_level : selected_level;
      if (current != this.state.current_level) {
        this.setState({ current_level: current });
      } else {
        this.setState({ loading_map: false });
      }
    }
  }

  selectStore = (data, type, mall_level_id, level) => {
    this.setState({
      show_location: true,
      loading_map: true,
      request_type: type,
      selected_level: level,
      show_route_path: false,
      mall_element_selected: false
    });
    this.props.dispatch(loadStoreInfo(data, mall_level_id));
  };

  GoToStoresList = type => {
    this.props.navigation.navigate('StoreList', { selectStore: this.selectStore, type });
  };

  saveConfig = (acsensor, escalera, escaleraElec) => {
    this.setState({
      acsensorChk: acsensor,
      escaleraChk: escalera,
      escaleraElecChk: escaleraElec
    });
    setTimeout(() => {
      this.GenerateRoute(false);
    }, 100);
  };

  GoToConfigScreen = () => {
    this.props.navigation.navigate('RouteConfiguration', {
      acsensorChk: this.state.acsensorChk,
      escaleraChk: this.state.escaleraChk,
      escaleraElecChk: this.state.escaleraElecChk,
      saveConfig: this.saveConfig
    });
  };

  saveBathroom = data => {
    this.setState({
      store_mall_element_id: data.id,
      store_limit_points: data.limit_points,
      store_access_points: data.access_points,
      store_location_level: data.level,
      current_level: data.level,
      show_route_path: false,
      mall_element_selected: true
    });
  };

  saveHelpCenter = data => {
    this.setState({
      store_mall_element_id: data.id,
      store_limit_points: data.limit_points,
      store_access_points: data.access_points,
      store_location_level: data.level,
      current_level: data.level,
      show_route_path: false,
      mall_element_selected: true
    });
  };

  GoToBathroomScreen = () => {
    console.log('niveles');
    console.log(this.state.current_level);

    this.props.navigation.navigate('Bathrooms', {
      map_id: this.state.levels[0].map_id,
      level_id: this.state.current_level,
      saveBathroom: this.saveBathroom
    });
  };

  GoToHelpCenterScreen = () => {
    this.props.navigation.navigate('HelpCenter', {
      map_id: this.state.levels[0].map_id,
      level_id: this.state.current_level,
      saveHelpCenter: this.saveHelpCenter
    });
  };

  GenerateRoute = (show_toast = true) => {
    const preferences = [];
    if (this.state.escaleraChk) preferences.push('ESCALERA');
    if (this.state.escaleraElecChk) preferences.push('ESCALERA-ELECTRICA');
    if (this.state.acsensorChk) preferences.push('ASCENSOR');
    const data = {
      mall_element_id_from: this.state.my_location_mall_element_id,
      mall_element_id_to: this.state.store_mall_element_id,
      preferences
    };
    if (data.mall_element_id_from && data.mall_element_id_to) {
      this.props.dispatch(loadRoute(data));
      this.setState({ show_route_path: true, current_level: this.state.my_location_level });
    } else if (!data.mall_element_id_from) {
      show_toast
        ? Toast.show({
            text: 'Dinos donde te encuentras.'
          })
        : null;
    } else {
      show_toast
        ? Toast.show({
            text: 'Indica tu destino.'
          })
        : null;
    }
  };

  showStoreLocation = () =>
    this.state.store_limit_points.length &&
    !this.state.loading_map &&
    this.state.current_level == this.state.store_location_level;
  showRoute = () => this.state.route_path && !this.state.loading_map && this.state.show_route_path;
  currentLevelRoutePath = () => {
    const route = this.state.route_path;
    const current_route = route
      ? route.filter(element => element.level == this.state.current_level)
      : [];

    return current_route;
  };
  showMyLocation = () =>
    this.state.my_location &&
    !this.state.loading_map &&
    this.state.current_level == this.state.my_location_level;
  renderMap(selected_level) {
    //Usar esto en momentos desesperados,
    //el zoom ahorita está medio buggy pero funciona con buena resolución
    //const IMAGE_WIDTH = width;
    //const IMAGE_HEIGHT = width * selected_level.image_height / selected_level.image_width;

    const IMG_HEIGHT = height;
    const IMG_WIDTH = (height * selected_level.image_width) / selected_level.image_height;

    return (
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
            <View
              style={{
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                position: 'relative',
                backgroundColor: 'white'
              }}
            >
              <ImageCacheProvider
                style={{
                  width: IMG_WIDTH,
                  height: IMG_HEIGHT,
                  position: 'absolute'
                }}
                urlsToPreload={[selected_level.image]}
              >
                <CachedImage
                  source={{ uri: selected_level.image }}
                  resizeMode="contain"
                  onLoadStart={e => this.setState({ loading_map: true })}
                  onLoadEnd={e => this.setState({ loading_map: false })}
                  style={{
                    width: IMG_WIDTH,
                    height: IMG_HEIGHT,
                    position: 'absolute'
                  }}
                />
              </ImageCacheProvider>
              <Loader loading={this.state.loading_map} />
              <DrawSvg
                width={IMG_WIDTH}
                height={IMG_HEIGHT}
                storeLimits={this.state.store_limit_points}
                myPositionLimits={this.state.my_location_limit_points}
                path={this.currentLevelRoutePath()}
                myPosition={this.state.my_location}
                drawStore={this.showStoreLocation()}
                drawPath={this.showRoute()}
                drawMyPosition={this.showMyLocation()}
                style={{ position: 'absolute', top: 0, left: 0, backgroundColor: 'yellow' }}
              />
            </View>
          </ImageZoom>
        </View>

        <Fab
          active={this.state.options}
          direction="up"
          style={{ backgroundColor: '#1967B0' }}
          position="bottomRight"
          onPress={() => this.setState({ options: !this.state.options })}
        >
          <Icon name="more" style={{ color: '#fff' }} />

          <Button
            style={{ backgroundColor: '#52AB85' }}
            onPress={() =>
              ActionSheet.show(
                {
                  options: this.state.buttons,
                  cancelButtonIndex: this.state.cancel_index,
                  title: 'Seleccione un nivel'
                },
                buttonIndex => {
                  if (
                    buttonIndex != this.state.cancel_index &&
                    buttonIndex != this.state.current_level - 1
                  ) {
                    this.setState({
                      current_level: buttonIndex + 1,
                      show_location: false,
                      loading_map: true
                    });
                  }
                }
              )
            }
          >
            <View style={styles.levelButtonView}>
              <Text style={styles.levelButtonNumber}> {this.state.current_level} </Text>
            </View>
          </Button>
          <Button style={{ backgroundColor: '#EF823F' }} onPress={this.GenerateRoute}>
            <Icon name="md-navigate" color="white" style={{ transform: [{ rotate: '45deg' }] }} />
          </Button>

          <Button style={{ backgroundColor: '#D19D14' }} onPress={this.GoToBathroomScreen}>
            <Icon name="water" color="white" />
          </Button>
          <Button style={{ backgroundColor: '#1967B0' }} onPress={this.GoToHelpCenterScreen}>
            <Icon name="centercode" color="white" />
          </Button>
          <Button style={{ backgroundColor: '#EF823F' }} onPress={this.GoToConfigScreen}>
            <Icon type="Foundation" name="widget" color="white" />
          </Button>
        </Fab>

        <Fab
          active
          direction="up"
          style={{ backgroundColor: '#1967B0' }}
          position="bottomLeft"
          onPress={() => this.GoToStoresList(MY_LOCATION_TYPE)}
        >
          <Icon name="locate" style={{ color: '#fff' }} />
        </Fab>
      </View>
    );
  }

  render() {
    const selected_level = this.state.levels.find(
      element => element.level === this.state.current_level
    );

    return (
      <Root>
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon type="FontAwesome" name="angle-left" />
              </Button>
            </Left>
            <Body>
              <Title> Mapa </Title>
            </Body>

            <Right>
              <Button transparent onPress={() => this.GoToStoresList(STORE_TYPE)}>
                <Icon name="ios-search" />
              </Button>
            </Right>
          </Header>
          <Container style={styles.mainContent}>
            {this.state.levels.length ? this.renderMap(selected_level) : <Loader loading />}
          </Container>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  mainbutton: {
    borderWidth: 1,
    width: 50,
    height: 50,
    borderColor: '#5A6978'
  },
  mapContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 15,
    position: 'absolute',
    right: 0,
    bottom: 20
  },
  mainContent: {
    backgroundColor: 'white'
  },
  map: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
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
});

const mapStateToProps = state => ({
  maps: state.mapsReducer,
  storeInfo: state.storeInfoReducer,
  route: state.routesReducer
});

export default connect(mapStateToProps)(HomeScreen);
