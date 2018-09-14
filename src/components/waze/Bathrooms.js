import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  Dimensions,
  FlatList,
  ScrollView,
  Alert,
  ImageBackground
} from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Button,
  Title,
  Item,
  Input,
  Icon,
  Root,
  ActionSheet,
  CheckBox,
  View
} from 'native-base';

import { StackNavigator } from 'react-navigation';

const { width, height } = Dimensions.get('window');

import { connect } from 'react-redux';
import { loadBathrooms } from '../../actions/bathrooms';

class Bathrooms extends Component {
  componentWillMount() {
    const map = this.props.navigation.getParam('map_id', {});
    const level = this.props.navigation.getParam('level_id', {});

    this.props.dispatch(loadBathrooms(map, level));
  }

  constructor(props) {
    super(props);
    this.state = {
      map_id: this.props.navigation.getParam('map_id', {}),
      level_id: this.props.navigation.getParam('level_id', {})
    };
  }

  componentWillReceiveProps(nextProps) {
    const { baths } = nextProps.bathrooms;

    console.log('component will recieve');
    console.log(baths);
    if (baths.length) this.setState({ data: baths });
  }

  static navigationOptions = {
    header: null
  };

  selectBathroom(bath) {
    console.log('save configuration');
    const func = this.props.navigation.getParam('saveBathroom', null);
    //const { navigation } = this.props;
    func(bath);
    this.props.navigation.goBack();
  }

  _renderItem(item) {
    console.log(item);
    return (
      <ListItem
        button
        onPress={() => {
          this.selectBathroom(item);
        }}
      >
        <Left>
          <Icon type="MaterialIcons" name="wc" />
        </Left>
        <Body style={{ alignContent: 'flex-start' }}>
          <Text style={{ color: 'black' }}>{item.description}</Text>
        </Body>
        <Right>
          <Text style={{ color: '#b7acac', fontSize: 10 }}>Nivel {item.level}</Text>
        </Right>
      </ListItem>
    );
  }

  render() {
    console.log(this.props);
    const { baths } = this.props.bathrooms;

    console.log(this.state.map_id);

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon type="FontAwesome" name="angle-left" />
            </Button>
          </Left>
          <Body>
            <Title>Baños</Title>
          </Body>
        </Header>
        <Container>
          {baths.length ? (
            <List dataArray={this.state.data} renderRow={item => this._renderItem(item)} />
          ) : null}
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ bathrooms: state.bathroomsReducer });

export default connect(mapStateToProps)(Bathrooms);
