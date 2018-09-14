import React, { Component } from 'react';
import { AsyncStorage, View, Alert, FlatList } from 'react-native';
import { Text, Button, Icon, Container, List, ListItem, Body, Left } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class AuxFavoriteStore extends Component {
    
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
    
    render() {
        return (
            <FlatList
                ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
                renderItem={({ item }) => this.auxRenderItem(item)}
                data={store.products} /* Categoría 2 */
                extraData={this.state.pressedHeart}
            />
        );
    }
}
