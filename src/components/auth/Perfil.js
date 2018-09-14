import React, { Component } from 'react';
import { TextInput, StyleSheet, Dimensions, View, ProgressBar, Alert } from 'react-native';
import {
  Container,
  Content,
  Form,
  Body,
  Left,
  Right,
  Header,
  Icon,
  Button,
  Text,
  Title,
  Thumbnail,
  Item,
  Toast
} from 'native-base';
import { connect } from 'react-redux';
import { loadProfile, editProfile } from '../../actions/profile';
import AlertView from './AlertView';
import { getUserToken } from '../../utils/storage';
import DatePicker from 'react-native-datepicker';

class Perfil extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      first_name: '',
      phone_number: '',
      date_of_birth: '',
      email: '',
      avatar: null,
      gamification_points_amount:0,
    };
  }

  toggleEditable() {
    this.setState({
      editable: !this.state.editable
    });
  }

  componentWillMount() {
    this.props.dispatch(loadProfile());
  }
  componentDidCatch() {
    Alert.alert('Ups', 'Ha ocurrido un error', [
      {
        text: 'Aceptar',
        onPress: this.aceptar.bind(this)
      },
      {
        text: 'Cancelar'
      }
    ]);
  }
  componentDidMount() {
    const { profile } = this.props.profile;
    this.setState({
      first_name: profile.user.first_name,
      phone_number: profile.user.phone_number,
      date_of_birth: profile.user.date_of_birth,
      gamification_points_amount: profile.user.gamification_points_amount
     
    });
    
  }

  submit(user) {
    const request = new XMLHttpRequest();

    request.open('PUT', 'http://200.16.7.150:8083/api/v1/users/profile');
    let userToken = '';
    var points= this.state.gamification_points_amount;
    console.log(points);
    getUserToken().then(token => {
      userToken = token;
      request.setRequestHeader('Authorization', userToken);
      request.setRequestHeader('Content-Type', 'application/json');
      request.setRequestHeader('Accept', 'application/json');

      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          console.log('Status:', this.status);
          console.log('Headers:', this.getAllResponseHeaders());
          console.log('Body:', this.responseText);
          var respond=JSON.parse(this.responseText);
          console.log(respond);
          
          
          console.log(respond.user.gamification_points_amount);
          if ((respond.user.gamification_points_amount-points)!=0){
            var message='Has ganado puntos: '+ (respond.user.gamification_points_amount-points);
            Toast.show({
              text: message,
              duration: 2500
            })
          }
          
        }
      };
      const body = {};
      const sub_body = {};
      sub_body.first_name = this.state.first_name;
      sub_body.phone_number = this.state.phone_number;
      sub_body.date_of_birth = this.state.date_of_birth;
      // can recieve only edited parameters, no use of sending avatar
      // sub_body["avatar"] = user.avatar;
      body.user = sub_body;
      request.send(JSON.stringify(body));
    });

    this.toggleEditable();
  }

  setInputValuefirst_name(text) {
    this.setState({ first_name: text });
  }

  setInputValuephone_number(text) {
    this.setState({ phone_number: text });
  }

  setDate_of_birth(text) {
    //Alert.alert(text)
    this.setState({ date_of_birth: text });
  }

  takeMyPic() {
    this.props.navigation.navigate('CameraView');
  }

  render() {
    const { profile } = this.props.profile;

    console.log(profile);
    //const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png';
    return (
      <Container style={{ backgroundColor: '#ffffff' }}>
        <Header style={styles.header}>
          <Button transparent>
            <Icon
              type="Feather"
              name="chevron-left"
              style={{ fontSize: 30, color: 'gray' }}
              onPress={() => this.props.navigation.goBack()}
            />
          </Button>
          <Body style={{ flex: 1, justifyContent: 'center' }}>
            <Title style={{ color: '#000000', marginLeft: 70 }}> Perfil </Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        {profile.user ? (
          <Content>
            <View style={styles.containerTop}>
              <Left>
                <Button icon transparent primary onPress={() => this.takeMyPic()}>
                  <Icon type="Feather" name="camera" style={{ fontSize: 30, color: 'gray' }} />
                </Button>
              </Left>
              <Body style={{ flex: 1, justifyContent: 'center' }}>
                <Thumbnail style={styles.avatar} source={{ uri: profile.user.avatar }} />
              </Body>
              <Right>
                <Button iconRight transparent primary onPress={() => this.toggleEditable()}>
                  <Icon type="Feather" name="edit" style={{ fontSize: 30, color: 'gray' }} />
                </Button>
              </Right>
            </View>
            <Form>
              <View style={styles.container}>
                <Button transparent>
                  <Icon
                    type="Ionicons"
                    name="ios-medal"
                    style={{ fontSize: 30, color: 'gray', padding: 5, paddingLeft: 10 }}
                  />
                </Button>
                <View>
                  <Text style={{ color: 'gray' }}>{profile.user.gamification_points_amount<50?'Miembro Cobre':(profile.user.gamification_points_amount<100?'Miembro Plata':'Miembro Oro')}</Text>
                  <Text style={{ color: '#d3d3d3', fontSize: 10 }}>{profile.user.gamification_points_amount}/100 puntos</Text>
                </View>
                <Icon
                  type="EvilIcons"
                  name="question"
                  style={{ fontSize: 10, color: 'gray', padding: 5 }}
                />
              </View>
              <View style={{ backgroundColor: '#ffffff' }}>
                <Text style={styles.body}>Nombre</Text>
                <TextInput
                  style={styles.input}
                  placeholder={profile.user.first_name}
                  placeholderColor="black"
                  editable={this.state.editable}
                  keyboardType="default"
                  onChangeText={text => this.setInputValuefirst_name(text, profile.user)}
                />
              </View>
              <View style={{ backgroundColor: '#ffffff' }}>
                <Text style={styles.body}>Correo</Text>
                <TextInput
                  id="email"
                  style={styles.input}
                  placeholder={profile.user.email}
                  placeholderColor="black"
                  editable={false}
                />
              </View>
              <View style={{ backgroundColor: '#ffffff' }}>
                <Text style={styles.body}>Teléfono</Text>
                <TextInput
                  style={styles.input}
                  placeholder={profile.user.phone_number}
                  placeholderColor="black"
                  editable={this.state.editable}
                  keyboardType="phone-pad"
                  onChangeText={text => this.setInputValuephone_number(text, profile.user)}
                />
              </View>
              <View style={{ backgroundColor: '#ffffff' }}>
                <Text style={styles.body}>Cumpleaños</Text>
                <DatePicker
                  style={styles.inputDate}
                  date={this.state.date_of_birth}
                  mode="date"
                  placeholder={profile.user.date_of_birth}
                  format="DD-MM-YYYY"
                  minDate="01-05-1920"
                  maxDate="01-06-2018"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                  }}
                  disabled={!this.state.editable}
                  onDateChange={date => {
                    this.setDate_of_birth(date, profile.user);
                  }}
                />
              </View>

              {this.state.editable ? (
                <View style={{ marginTop: 5 }}>
                  <Button
                    rounded
                    style={styles.buttonSubmit}
                    onPress={() => this.submit(profile.user)}
                  >
                    <Text>Registrar</Text>
                  </Button>
                </View>
              ) : null}
               <Button iconLeft transparent primary onPress={() =>this.props.navigation.navigate('AchievementsView')}>
                  <Icon type="Entypo" name="price-ribbon" style={{ fontSize: 30, color: 'gray' }} />
                  <Text style={{color: 'gray'}} >Logros</Text>
                </Button>
            </Form>
          </Content>
        ) : null}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 15,
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  containerRep: {
    flexDirection: 'row',
    backgroundColor: '#ffffff'
  },
  containerTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    marginTop: 20
  },
  body: {
    marginTop: 15,
    marginLeft: 20,
    color: 'gray',
    fontSize: 12
  },
  input: {
    marginLeft: 20,
    fontSize: 18
  },
  avatar: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#000000'
  },
  header: {
    height: 40,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonSubmit: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#2466FF'
  },
  inputDate: {
    marginLeft: 20,
    fontSize: 18,
    alignSelf: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = state => ({ profile: state.profileReducer });

export default connect(mapStateToProps)(Perfil);
