import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import { Icon, Left, Body, Card, CardItem,Right } from 'native-base';
import { connect } from 'react-redux';

export default class EventSection extends Component {
	constructor(props) {
		super(props);
	}

	render() {
    const myItem = this.props.event;
		return (
	      <Card style={myStyles.itemContainer}>

          <CardItem>
            <Left style={{ marginLeft: 5 }}>
                <Body>
                  <Text>{myItem.name}</Text>
                </Body>
              </Left>
          </CardItem>
          <CardItem cardBody button onPress={() => this.props.navigation.navigate('EventDetail', { item: myItem })} >
              <Image source={{uri: myItem.banner}} style={{height: 200, width: null, flex: 1}}/>
          </CardItem>
	        <CardItem>
              <Left>
                  <Text>Ubicación: </Text>
                  <Text>{myItem.location}</Text>
              </Left>
              <Right>
                <Text>{myItem.event_date}</Text>
              </Right>
            </CardItem>
	      </Card>
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
  favourite:{ 
    color: 'red', 
    position: 'absolute',
    right: 1, 
    bottom: 1
  }

});
