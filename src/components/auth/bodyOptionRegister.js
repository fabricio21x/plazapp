//import libraries for making a component
import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Alert, Dimensions } from 'react-native';
import CardSection from './CardSection';
import FBLoginButton from './FBLoginButton';
//make a component
export default class Body extends Component {


    constructor(props) {
        super(props);
    }

    render() {
        const { navigate } = this.props.navigation;
        return ( 
            <View style={styles.containerStyle}>
                <CardSection>
                    <View>
                        <Text style={styles.headerContentStyle}> {'Bienvenido'} </Text>
                    </View>           
                </CardSection>
                <CardSection>
                    <View style={styles.ButtonContainer}>

                        <FBLoginButton  navigate = {navigate}/>                            
                        
                        <TouchableOpacity onPress={() => navigate('BodyRegisterForm')} style={styles.createButtonStyle}> 
                            <Text style={styles.TextStyle_Question}>{'Crea una cuenta con tu correo'}</Text>
                        </TouchableOpacity>

                    </View>
                </CardSection>
                <CardSection>
                    <View style={styles.ContentSyles}>                        
                        <Text style={styles.TextStyle_Question}> {'¿Ya tienes una cuenta?'} </Text>
                        <TouchableOpacity onPress={() => navigate('LoginMain')}>
                            <Text style={styles.TextStyle_Link}> {'Ingresa Aqui'} </Text>
                        </TouchableOpacity>
                    </View>   
                </CardSection>
            </View>
        );
    }	
}

const styles = {
    ButtonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
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
    },
    headerContentStyle: {
        fontSize: 40,
        alignSelf: 'center',
        paddingTop: 60,
        paddingBottom: 20
    },

    fbButtonStyle: {
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#4267B2',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
        height: 45,
        marginTop: 20
    },

    TextStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: '800',
        paddingTop: 10,
        paddingBottom: 10
    },
    
    createButtonStyle: {
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#424242',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 20,
        marginBottom: 20
    },
    TextStyle_Question: {
        alignSelf: 'center',
        color: '#757575',
        fontSize: 18,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    TextStyle_Link: {
        alignSelf: 'center',
        color: '#757575',
        fontSize: 18,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        textDecorationLine: 'underline'
    }
};

