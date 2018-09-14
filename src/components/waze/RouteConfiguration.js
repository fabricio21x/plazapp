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

class RouteConfiguration extends Component {
  constructor(props) {
    super(props);
    //Alert.alert(this.props.navigation.state.params.acsensorChk.toString());
    this.state = {
      acsensorChk: this.props.navigation.getParam('acsensorChk', {}),
      escaleraChk: this.props.navigation.getParam('escaleraChk', {}),
      escaleraElecChk: this.props.navigation.getParam('escaleraElecChk', {})
    };
    //Alert.alert( this.props.navigation.state.params.escaleraElecChk.toString());
  }
  static navigationOptions = {
    header: null
  };

  saveConfiguration(acsensor, escalera, escaleraElec) {
    console.log('save configuration');
    const func = this.props.navigation.getParam('saveConfig', null);
    //const { navigation } = this.props;
    func(acsensor, escalera, escaleraElec);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon type="FontAwesome" name="angle-left" />
            </Button>
          </Left>
          <Body>
            <Title>Configuración</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() =>
                this.saveConfiguration(
                  this.state.acsensorChk,
                  this.state.escaleraChk,
                  this.state.escaleraElecChk
                )
              }
            >
              <Text>Confirmar</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <ListItem>
            <Body>
              <Text note>Incluir en la ruta</Text>
            </Body>
          </ListItem>
          <ListItem onPress={() => this.setState({ acsensorChk: !this.state.acsensorChk })}>
            <Body>
              <Text>Acsensores</Text>
            </Body>
            <CheckBox
              checked={this.state.acsensorChk}
              onPress={() => this.setState({ acsensorChk: !this.state.acsensorChk })}
            />
          </ListItem>
          <ListItem onPress={() => this.setState({ escaleraChk: !this.state.escaleraChk })}>
            <Body>
              <Text>Escaleras</Text>
            </Body>
            <CheckBox
              checked={this.state.escaleraChk}
              onPress={() => this.setState({ escaleraChk: !this.state.escaleraChk })}
            />
          </ListItem>
          <ListItem onPress={() => this.setState({ escaleraElecChk: !this.state.escaleraElecChk })}>
            <Body>
              <Text>Escaleras eléctricas</Text>
            </Body>
            <CheckBox
              checked={this.state.escaleraElecChk}
              onPress={() => this.setState({ escaleraElecChk: !this.state.escaleraElecChk })}
            />
          </ListItem>
        </Content>
      </Container>
    );
  }
}

export default RouteConfiguration;
