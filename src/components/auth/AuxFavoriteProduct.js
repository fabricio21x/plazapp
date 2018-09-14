import React, { Component } from 'react';
import { AsyncStorage, View, Alert, FlatList, TouchableWithoutFeedback, StyleSheet, Image, ScrollView } from 'react-native';
import { Text, Button, Icon, Container, List, ListItem, Body, Left, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { loadProductsFav } from '../../actions/favProd';

class AuxFavoriteProduct extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            list1: '',
            keys: '',
            prodIds: this.props.parametro,
            fav: []        
        };
    }


    componentWillMount() {
        this.props.dispatch(loadProductsFav());
    }

    auxRenderItem(myItem) {
        const { navigate } = this.props.navigation;
        return (
          <View style={myStyles.itemContainer}>       
            <Left style={{ marginLeft: 20 }}>
                <TouchableWithoutFeedback onPress={() => navigate('ProductDetail', { item: myItem })}>
                  <Image style={myStyles.image} source={{ uri: myItem.image }} />
                </TouchableWithoutFeedback>
            </Left>
            <Right>
                <Text style={myStyles.description} >{myItem.name}</Text>
            </Right>
          </View>
        );
      }
    
    renderList(favProds) {
        console.log(favProds.products);
        return (
            <FlatList
                style={myStyles.list}
                data={favProds.products}  /* Categoría 2 */
                renderItem={({ item }) => this.auxRenderItem(item)}
            />
        );
    }

    render() {
        console.log('ESTOY EN PRODUCTOS FAVORITOS');
        console.log(this.state.prodIds);
        console.log(this.props);
        const { favProds } = this.props.favProds;
        console.log(favProds.products);
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        {favProds.products ? this.renderList(favProds) : null}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const myStyles = StyleSheet.create({
    image: {
      width: 250,
      height: 250,
      flex: 1,
      alignSelf: 'center',
      marginRight: 20
    },
    itemContainer: {
      flex: 1,
      width: 300,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: 'gray',
      elevation: 1,
      marginRight: 5,
      marginTop: 10,
      backgroundColor: 'white'
    },
    list: {
        flex: 1,
    }
  });

const mapStateToProps = state => {
    return { favProds: state.favProdReducer };
};
 
export default connect(mapStateToProps)(AuxFavoriteProduct);
