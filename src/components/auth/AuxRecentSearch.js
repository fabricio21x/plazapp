import React, { Component } from 'react';
import { AsyncStorage, View, Alert, FlatList } from 'react-native';
import { Text, Button, Icon, Container, List, ListItem, Body, Left } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { forgetItem } from '../../utils/storage'; 

export default class AuxRecentSearch extends Component {
    
    constructor() {
        super();
        this.state = {
            list1: '',
            keys: ''
        };
        AsyncStorage.getItem('local_db').then((value) => {
            this.setState({
                list1: JSON.parse(value),
            });
        });
    }

    parsedData() {
        if (this.state.list1) {
            return (
                <FlatList
                    data={this.state.list1}
                    renderItem={({ item }) => this.renderItem(item)}
                />  
            );
        } else {
            return (
                <Text> No tiene elementos buscados recientemente </Text>
            );
        }
    }

    buttonPressed() {
        if (this.state.list1) {
            Alert.alert(
                'Confirmación',
                '¿Esta seguro que desea borrar su historial de búsquedas?',
                [
                  { text: 'Confirmar', 
                  onPress: () => { 
                    forgetItem('local_db').then(() => {
                            this.setState({
                                list1: [],
                                name: ''
                            });
                        }); 
                    } 
                  },
                  { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                ],
                { cancelable: false }
              );
            //this.setState({ list1: [...this.state.list1, { name: '' }] }); 
        }  
    }

    renderItem(item) {
        console.log(item);
        return (
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}>
                <Button transparent light>
                    <Text style={{ color: 'black' }}>{item.name}</Text>
                </Button>
            </View>
        );
    }
    
    render() {
        return (
            <Container style={{ backgroundColor: '#ffffff' }}>
                <View style={{ flex: 1 }} >
                    <ListItem icon>
                        <Left>
                            <Button onPress={() => this.buttonPressed()} >
                                <Icon name="ios-trash" />
                            </Button> 
                        </Left>
                        <Body>
                            <Text style={{ fontSize: 20 }} >Busquedas Recientes</Text>
                        </Body>
                    </ListItem>                                  
                    {this.parsedData()}                   
                </View>
            </Container>
        );
    }
}

