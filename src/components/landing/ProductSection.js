import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { Icon, Left } from 'native-base';
import { connect } from 'react-redux';

export default class ProductSection extends Component {
	constructor(props) {
		super(props);
	}

	render() {
    const myItem = this.props.product;
    const isFavorite = this.props.favorites.includes(myItem.id);
    const myScreen = this.props.screen;
    console.log('AQUIIIIIIIIIII EL SCREEN');
    console.log(myScreen);

		return (
			<View style={myStyles.itemContainer}>
	        <Left style={{ marginLeft: 5 }}>
	            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ProductDetail', { item: myItem, favorite: isFavorite, screen: myScreen })}>
	              <Image style={myStyles.image} source={{ uri: myItem.image }} />
	            </TouchableWithoutFeedback>
	        </Left>
	        <Left >
	          <Text style={myStyles.description} >{myItem.name}</Text>
	          <TouchableWithoutFeedback onPress={() => this.props.onPressHearts({ item: myItem })}>
	            <Icon 
	            type='MaterialCommunityIcons' 
	            name={(this.props.favorites.includes(myItem.id)) ? "heart": "heart-outline"} 
	            size={30} 
	            style={(this.props.favorites.includes(myItem.id)) ? myStyles.favourite : myStyles.noFavourite} 
	            />
	          </TouchableWithoutFeedback>
	        </Left>
	      </View>
			);
	}
}

const myStyles = StyleSheet.create({
  description: {
    color: '#757575',
    fontSize: 15,
    marginTop: 3,
    marginBottom: 3,
    textAlign: 'left'
  },
  image: {
    width: 120,
    height: undefined,
    flex: 1,
    alignSelf: 'center',
    marginRight: 20
  },
  itemContainer: {
    flex: 1,
    width: 150,
    height: 165,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'gray',
    elevation: 1,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white'
  },
  noFavourite: {
    position: 'absolute',
    right: 1,
    bottom: 1,
    color:'gray'
  },
  favourite: { 
    color: 'red', 
    position: 'absolute',
    right: 1, 
    bottom: 1
  }

});
