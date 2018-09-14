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
import { loadHelpCenter } from '../../actions/helpcenter';

class HelpCenter extends Component {
  componentWillMount() {
    const map = this.props.navigation.getParam('map_id', {});
    const level = this.props.navigation.getParam('level_id', {});

    this.props.dispatch(loadHelpCenter(map, level));
  }

  constructor(props) {
    super(props);
    this.state = {
      map_id: this.props.navigation.getParam('map_id', {}),
      level_id: this.props.navigation.getParam('level_id', {})
    };
  }

  componentWillReceiveProps(nextProps) {
    const { centers } = nextProps.centers;
    if (centers.length) this.setState({ data: centers });
  }

  static navigationOptions = {
    header: null
  };

  selectCenter(data) {
    console.log('save configuration');
    const func = this.props.navigation.getParam('saveHelpCenter', null);
    //const { navigation } = this.props;
    func(data);
    this.props.navigation.goBack();
  }

  _renderItem(item) {
    console.log(item);
    return (
      <ListItem
        button
        onPress={() => {
          this.selectCenter(item);
        }}
      >
        <Left>
          <Icon name="centercode" />
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
    const { centers } = this.props.centers;

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
            <Title>Centros de ayuda</Title>
          </Body>
        </Header>
        <Container>
          {centers.length ? (
            <List dataArray={this.state.data} renderRow={item => this._renderItem(item)} />
          ) : null}
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ centers: state.helpcenterReducer });

export default connect(mapStateToProps)(HelpCenter);
