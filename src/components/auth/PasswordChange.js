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
import { connect } from 'react-redux';
import { loadProfile } from '../../actions/profile';
import CardSection from './CardSection';

class PasswordChange extends Component {

	constructor(props) {
		super(props);
		this.state = {
			passText1: '',
            passText2: '',
		};
	}

    componentWillMount() {
        this.props.dispatch(loadProfile());
    }



    changePassword() {
        const { profile } = this.props.profile;
        const userId = profile.user.id;
        var request = new XMLHttpRequest();
        request.open('GET', 'http://200.16.7.150:8081/mkt/password_change/' + userId + '/' + this.state.passText1);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Accept', 'application/json');
        request.onreadystatechange = function () {
          if (this.readyState === 4) {
            var requestResponse = JSON.parse(this.responseText);
            //Alert.alert(('newPass' in requestResponse).toString());
            if ('success' in requestResponse) {
                Alert.alert('Cambio de contraseña','Su contraseña ha sido actualizada.');                
            }else{
                Alert.alert('Cambio de contraseña','No se ha podido actualizar su contraseña.');
            }
            return;
          }
        };
        request.send();
    }


    tryChangePassword() {
        // initial verification
        if (this.state.passText1 !== this.state.passText2){
            Alert.alert("Cambio de contraseña","Ha ingresado incorrectamente la contraseña.");
            return;
        }
        if (this.state.passText1.length === 0 || this.state.passText2.length === 0){
            Alert.alert("Cambio de contraseña","No ha completado alguno de los campos.");
            return;
        }
        this.changePassword();
        return;
    }

    render() {
		return (
			<View style={styles.containerStyle}>
			<CardSection>
			<Text style={styles.forgotPassword}>
				Ingrese la nueva contraseña que desea usar para su cuenta; deberá tener como mínimo 6 caracteres:
			</Text>	
			<Form>
				<Item>
					<Icon active name="unlock" />
						<Input
                        secureTextEntry={true}           
						placeholder="Ingrese la nueva contraseña" 
						onChangeText={(text) => this.setState({ passText1: text })} keyboardType='default'
						/>
				</Item>
                <Item>
                    <Icon active name="unlock" />
                        <Input
                        secureTextEntry={true}           
                        placeholder="Vuelva a ingresar la nueva contraseña" 
                        onChangeText={(text) => this.setState({ passText2: text })} keyboardType='default'
                        />
                </Item>
				<View style={styles.buttonSection}>        
		          <Button 
		          rounded 
		          primary 
		          style={styles.mb15} 
		          onPress={() => this.tryChangePassword()} 
		          >
		              <Text style={{ fontSize: 18 }} uppercase={false}>Cambiar contraseña
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

const mapStateToProps = state => {
    return { profile: state.profileReducer };
};

export default connect(mapStateToProps)(PasswordChange);
