import React, { Component } from 'react';
import { Container, Header, Title, Button, Icon, Image, Card,
    Right, Left, Content, Body, Text, Segment } from 'native-base';
import { View, FlatList, TouchableWithoutFeedback, StyleSheet, ScrollView } from 'react-native';
import BottomNavigation from '../auth/bottomNavigation';

import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux'; 

import AuxFavoriteProduct from '../auth/AuxFavoriteProduct';
import AuxFavoriteStore from '../auth/AuxFavoriteStore';

class FavoriteView extends Component {
    static navigationOptions = {
        header: null
      };

    constructor(props) {
        super(props);
        this.state = {
            active: 1,
            flag: false,
            productIds: []
        };
    }  

    selectFavoriteType() {
        console.log('Seleccion de favorito');
        console.log(this.state.flag);            
        if (this.state.active === 2) {         
            return (
                <AuxFavoriteStore props='this.state.data_recent_search' /> 
            );
        } else if (this.state.active === 1) {
            console.log('ENTRE AL ELSE');
            return (
                <AuxFavoriteProduct navigation={this.props.navigation} />
            );
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                        <Title>Favoritos</Title>
                    </Body>
                    <Right/>
                </Header>
                <View style={{ height: 40 }}>
                    <Segment>
                        <Button first active={this.state.active === 1 ? true : false} onPress={() => this.setState({ active: 1 })}>
                            <Text>Productos</Text>
                        </Button>
                        <Button last active={this.state.active === 2 ? true : false} onPress={() => this.setState({ active: 2 })}>
                            <Text>Tiendas</Text>
                        </Button>
                    </Segment>
                </View> 
                <Content padder>
                    {(this.state.active === 1) && this.selectFavoriteType()}                       
                    {(this.state.active === 2) && <Text>Tiendas</Text>}
                </Content>
                <BottomNavigation navigation={this.props.navigation} screenName='FavoriteView'/>    
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return { products: state.productsReducer,
     favorites: state.productsfavoritesReducer }
  };
  
export default connect(mapStateToProps)(FavoriteView);
