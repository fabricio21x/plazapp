import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import { Icon, Left } from 'native-base';
import { connect } from 'react-redux';

export default class BlobSection extends Component {
	constructor(props) {
		super(props);
	}

	render() {		
		return (
			<View style={myStyles.itemContainer}>
	        <Left style={{ marginLeft: 5 }}>
	            <TouchableWithoutFeedback>
	              <Image style={myStyles.image} />
	            </TouchableWithoutFeedback>
	        </Left>
	        <Left >
	          <Text style={myStyles.description} />
	          <TouchableWithoutFeedback>
	            <Icon 
	            type='MaterialCommunityIcons' 
	            name="heart-outline" 
	            size={30} 
	            style={myStyles.noFavourite} 
	            />
	          </TouchableWithoutFeedback>
	        </Left>
	      </View>
			);
	}
}

const myStyles = StyleSheet.create({
  text: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  description: {
    color: '#000000',
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
    left: 45,
    bottom: 1,
    color: 'gray'
  },
});
