import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import { loadProfile } from '../../actions/profile';   
import { Icon, Thumbnail, Container } from 'native-base';
import { resetAction } from '../../constants/reset';
import { getUserToken, forgetItem } from '../../utils/storage';  
import { API_TOKEN } from '../../constants/config.js';

const { width, height } = Dimensions.get('window');

class Menu extends Component {

  closeSession(){
    var request = new XMLHttpRequest();
    var _this = this;
    request.open('POST', 'http://200.16.7.150:8083/api/v1/sessions/logout');
    var userToken = '';
    getUserToken().then((token) => {
      userToken = token;
      request.setRequestHeader('Authorization', userToken);
      request.setRequestHeader('Content-Type', 'application/json');
      request.setRequestHeader('Accept', 'application/json');

      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          console.log('Status:', this.status);
          console.log('Headers:', this.getAllResponseHeaders());
          console.log('Body:', this.responseText);
          forgetItem(API_TOKEN).then(() => {
            _this.props.navigation.dispatch(resetAction('BodyOptionRegister'));
          });
        }
      };      
      request.send();
    });
  }

  componentWillMount() {
    this.props.dispatch(loadProfile());
  }
  render() {
    const { profile } = this.props.profile;
    return (
      <Container>
         {profile.user ?
        <View style={styles.menu}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Perfil')}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarImage}>
              <Thumbnail style={styles.avatar} source={(profile.user.avatar === 'https:/avatars/original/missing.png') ? require('../../images/user.jpg') : { uri: profile.user.avatar }} />
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.text}>{profile.user.first_name}</Text>
                <Text style={styles.email}>{profile.user.email}</Text>
              </View>
            </View>
          </View>
          </TouchableWithoutFeedback>
          <ScrollView style={styles.scrollContainer}>
            <View style={[styles.items, styles.noSelectedItem]}>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Home')}>
                <View style={styles.withIcon}>
                  <Icon type="FontAwesome" name="home" style={styles.myIcon} />
                  <Text style={styles.text}>Inicio</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={[styles.items, styles.noSelectedItem]}>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('CategoriesView')}>
                <View style={styles.withIcon}>
                  <Icon type="FontAwesome" name="shopping-cart" style={styles.myIcon} />
                  <Text style={styles.text}>Productos</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={[styles.items, styles.noSelectedItem]}>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('HomeScreen')}>
                <View style={styles.withIcon}>
                  <Icon type="Ionicons" name="ios-navigate-outline" style={styles.myIcon} />
                  <Text style={styles.text}>Waze Plaza</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={[styles.items, styles.noSelectedItem]}>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ParkingMain')}>
                <View style={styles.withIcon}>
                  <Icon type="MaterialIcons" name="drive-eta" style={styles.myIcon} />
                  <Text style={styles.text}>Estacionamientos</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={[styles.items, styles.noSelectedItem]}>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('IncidentReport')}>
                  <View style={styles.withIcon}>
                          <Icon type="FontAwesome" name="exclamation-triangle" style={styles.myIcon} />
                    <Text style = {styles.text}>Reportar un incidente</Text>
                  </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={[styles.items, styles.noSelectedItem]}>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.dispatch(resetAction('PreferenceEdit'))}>
                <View style={styles.withIcon}>
                    <Icon type="MaterialIcons" name="settings" style={styles.myIcon} />
                  <Text style = {styles.text}>Editar Preferencias</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={[styles.items, styles.noSelectedItem]}>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('SecurityView')}>
                  <View style={styles.withIcon}>
                          <Icon type="MaterialIcons" name="lock" style={styles.myIcon} />
                    <Text style = {styles.text}>Seguridad</Text>
                  </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={[styles.items, styles.noSelectedItem]}>
                <TouchableWithoutFeedback onPress={() => this.closeSession()}>
                  <View style={styles.withIcon}>
                          <Icon type="MaterialIcons" name="exit-to-app" style={styles.myIcon} />
                    <Text style = {styles.text}>Cerrar Sesión</Text>
                  </View>
                </TouchableWithoutFeedback>
            </View>
          </ScrollView>
        </View>
        : null }
       </Container>
		);
	}
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width,
    height,
    backgroundColor: '#F5F5F5'
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width / 2 + 50,
    borderBottomWidth: 3,
    borderColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  avatar: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#000000',
    //borderRadius: 3,
    marginRight: 20
  },
  avatarImage: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    color: '#000000',
    fontSize: 17
  },
  email: {
    color: '#000000',
    fontSize: 10
  },
  withIcon: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  scrollContainer: {
    width: width / 2 + 60
  },
  rightIcon: {
    paddingRight: 30,
    height: 20,
    width: 20
  },
  items: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingLeft: 20,
    marginTop: 5
  },
  itemSelected: {
    borderLeftWidth: 5,
    borderColor: 'red'
  },
  noSelectedItem: {
    paddingVertical: 15,
    paddingLeft: 25,
    marginTop: 5
  },
  myIcon: {
    marginRight: 10,
    paddingLeft: 5,
    fontSize: 25,
    color: 'black'
  }
});
const mapStateToProps = state => {
  return { profile: state.profileReducer }
};

export default connect(mapStateToProps)(Menu);

