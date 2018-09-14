import React, { Component } from 'react';
import {
	StyleSheet, 
	Alert, 
	View 
} from 'react-native';
import {
  Item,
  Input,
  Form,
  Icon,
  Button,
  Text
} from 'native-base';
import CardSection from './CardSection';

export default class PasswordRecovery extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
		};
	}

	emailRecovery(){
        var request = new XMLHttpRequest();
        var _this = this;
        const email = _this.state.email;
        if (email.length === 0 ){
        	Alert.alert('Recuperación de contraseña','No se ha encontrado un usuario registrado con el correo indicado.');
        	return;
        }
        request.open('GET', 'http://200.16.7.150:8081/mkt/email_recovery/'+email);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Accept', 'application/json');
        request.onreadystatechange = function () {
          if (this.readyState === 4) {
            var requestResponse = JSON.parse(this.responseText);
            //Alert.alert(('newPass' in requestResponse).toString());
            if ('newPass' in requestResponse) {
                Alert.alert('Recuperación de contraseña','Su nueva contraseña llegará a su correo en unos minutos.');
                _this.emailDispatch(email, requestResponse.newPass);
            }else{
                Alert.alert('Recuperación de contraseña','No se ha encontrado un usuario registrado con el correo indicado.');
            }
          }
        };
        request.send();
    }

    emailDispatch(email, newPass) {
        var request = new XMLHttpRequest();

        request.open('POST', 'https://api.emailjs.com/api/v1.0/email/send');

        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Accept', 'application/json');
        request.onreadystatechange = function () {
          if (this.readyState === 4) {
            var requestResponse = this.responseText;
            // if (requestResponse.includes("OK")) {
            //     Alert.alert("good hit");
            // }
          }
        };

        var data = {
                service_id: 'outlook',
                template_id: 'template_uen01POe',
                user_id: 'user_Ioanrd4764qfWy63UNtHl',
                template_params: {
                    'name': 'Usuario',
                    'notes': 'Recuperacion de contrasenha.',
                    'email': email,
                    'newPass': newPass
                }
            };

        request.send(JSON.stringify(data));
    }

    render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.containerStyle}>
			<CardSection>
			<Text style={styles.forgotPassword}>
				Ingrese el correo con el que se registró en la aplicación.
			</Text>	
			<Form>
				<Item>
					<Icon active name="mail" />
						<Input           
						placeholder="Correo electrónico" 
						onChangeText={(text) => this.setState({ email: text })} keyboardType='email-address'
						/>
				</Item>
				<View style={styles.buttonSection}>        
		          <Button 
		          rounded 
		          primary 
		          style={styles.mb15} 
		          onPress={() => this.emailRecovery()} 
		          >
		              <Text style={{ fontSize: 18 }} uppercase={false}>Recuperar contraseña
		              </Text>
		          </Button>
		        </View>
			</Form>
			</CardSection>
			</View>
		);
    }
}

const styles = StyleSheet.create({
  buttonSection: {
    flexDirection: 'row', 
    justifyContent: 'center',
    marginBottom: 20,
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
    fontSize: 16,
    lineHeight: 16,
    marginTop: 12,    
    marginBottom: 20,
    color: '#757575',
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
