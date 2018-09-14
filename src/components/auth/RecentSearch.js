import React, { Component } from 'react';
import { Container, Icon, Item, Button, Header, Input, Body, Right } from 'native-base';
import { View, AsyncStorage, Alert } from 'react-native';
import BottomNavigation from '../auth/bottomNavigation';

import AuxRecentSearch from '../auth/AuxRecentSearch';
import AuxResultSearch from '../auth/AuxResultSearch';

export default class RecentSearch extends Component {

    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            searchVal: '',
            palabra_buscada: '',
            flag: false,
            searchFlag: false
        };  
    }

    setInputValue(text) {
        this.setState({ searchVal: text });  
    }

    buttonPressed() {
        if (this.state.searchVal.length > 0) {
            this.setState({ 
                flag: true,
                searchFlag: true,
                palabra_buscada: this.state.searchVal
            }, () => {
                this.setState({
                    searchFlag: false
                });
            }); 
        }
    }

    shouldComponentUpdate(nextState) {
        if (nextState.searchFlag) {
            return false;
        }
        return true;
    }

    afterSearch() {
        console.log(this.state['palabra_buscada']);
        console.log(this.state.flag);            
        console.log(this.state.searchFlag);
        if (this.state.flag === false) {         
            return (
                <AuxRecentSearch props='this.state.data_recent_search' /> 
            );
        }
        return (
            <AuxResultSearch parametro={this.state.palabra_buscada} navigation={this.props.navigation} />
        );
    }

    render() {
        return (
            <Container>
                <View style={{ flex: 1 }}>
                    <Header searchBar rounded>
                        <Body>
                            <Item>
                                <Input
                                    onChangeText={(text) => this.setInputValue(text)}
                                    placeholder="Buscar productos"
                                    placeholderTextColor ='#FFF'
                                    style={{ width: 150, color: '#FFF' }}
                                />
                            </Item>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.buttonPressed()}>
                              <Icon name='search' />
                            </Button>
                            <Button transparent onPress={() => this.props.navigation.navigate('AdvancedSearch')} >
                              <Icon name='more' />
                            </Button>
                        </Right>   
                    </Header>                   
                    {this.afterSearch()}                    
                </View>
                <BottomNavigation navigation={this.props.navigation} screenName='RecentSearch' />
            </Container>            
        );
    }
}
