import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from '../landing/Logo';
import LoginForm from './LoginForm';
import Wallpaper from './Wallpaper';
import CardSection from './CardSection';
import ButtonSubmit from './ButtonSubmit';
import {Button, Text, Body} from 'native-base';
import {StyleSheet, Alert, View, KeyboardAvoidingView} from 'react-native';
import {setUserToken,getUserToken,forgetItem} from './../../utils/storage';

export default class LoginScreen extends Component {

	constructor(props) {
			super(props);
			//this.state = { count: 0 };

			this.state = { 
        pressStatus: false,
        username: '',
        password: '',
      };
	}

  loginInfoCatch(userText, passText) {
    // Alert.alert(userText);
    // Alert.alert(passText);
    this.state.username = userText;
    this.state.password = passText;
    //this.tryLogin();
  }

  noCompleteInfo(){
    if (this.state.username == '' || this.state.password == ''){
      return true;
    }else{
      return false;  
    }
  }

  tryLogin() {
    if (this.noCompleteInfo()){
      Alert.alert("Error","No ha completado su información adecuadamente.");
      return;
    }
    // this.props.navigation.navigate('Home');
    const { navigate } = this.props.navigation;
    // const { navigation } = this.props.navigation;
    // navigation.navigate('Home');
    var request = new XMLHttpRequest();

    request.open('POST', 'http://200.16.7.150:8083/api/v1/sessions');

    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Accept', 'application/json');
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        var requestResponse = JSON.parse(this.responseText);
        if ('error' in requestResponse) {
          Alert.alert("Error","No se ha encontrado un usuario con las credenciales ingresadas.");
        } else {
          if ('session' in requestResponse) {
            
            //Alert.alert(requestResponse.session.access_token);
            var recievedToken = requestResponse.session.access_token;
            
            setUserToken(recievedToken).then(function () {
                var lastScreen = 'Home';
                navigate('Home', { lastScreen } );  
              });  
          } 
        }
      }
    };

    var body = {
      'email': this.state.username,
      'password': this.state.password,
    };

    request.send(JSON.stringify(body));
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.containerStyle}>
        <CardSection>
          <View style={{ marginTop:65 , marginBottom:65 }}>
          <Logo />
          </View>
        </CardSection>
        <CardSection>
          <View style={{marginLeft:5,marginRight:20, marginTop:30,marginBottom:0}}>
          <LoginForm loginInfoCatch={this.loginInfoCatch.bind(this)} />
          </View>
          <View style={styles.buttonSection}>        
            <Button 
            rounded 
            primary 
            style={styles.mb15} 
            onPress={() => this.tryLogin()} 
            >
                <Text style={{fontSize: 18 }} uppercase={false}>Ingresar
                </Text>
            </Button>
          </View>
          <View style={styles.signinSection}>
            <Text style={styles.forgotPassword} onPress={() => navigate('PasswordRecovery')}>
              Olvidé mi contraseña
            </Text>
          </View>
        </CardSection>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  buttonSection: {
    flexDirection: 'row', 
    justifyContent: 'center',
 },
 signinSection: {
    flexDirection: 'row', 
    justifyContent: 'center',
    marginBottom: 10    
 },
  mb15: {
    marginTop: 20,
  },
  forgotPassword: {    
    alignSelf: 'center',
    textAlign: 'center', // <-- the magic    
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 20,
    marginTop: 12,
    width: 200,
    color: '#757575',
    textDecorationLine: 'underline'
  },
   containerStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, heigth: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center' 
    }
});
