//import libraries for making a component
import React, { Component } from 'react';
import { Container, Header, Left, Body, Title, Content, Button, Icon, Right } from 'native-base';
import { View ,StyleSheet , FlatList,Alert} from 'react-native';
import { connect } from 'react-redux';
import { loadEvents } from '../../actions/events';
import EventSection from './EventSection';
import BottomNavigation from '../auth/bottomNavigation';

class AlertView extends Component {
    static navigationOptions = {
        header: null
      };
      constructor(props) {
		super(props);
		this.state = {
			isFinishedLoading: false,
			counter: 0
		};
    }
    componentWillMount() {
		this.props.dispatch(loadEvents());
    }


    render() {
        const {events}=this.props.events;
        console.log(events.events);
        return (
            <Container  style={{ flex: 1 }}>
                    <Header>
                        <Left/>
                        <Body>
                            <Title>Eventos</Title>
                        </Body>
                        <Right/>
                    </Header>
                    <Content>
                    {events.events ? 
                    <FlatList
                        vertical
                        ItemSeparatorComponent={() => <View style={{ width: 2 }} />}
                        renderItem={({ item }) => 
                        <EventSection 
                        navigation={this.props.navigation} 
                        event={item}  
                        />}
                        data={events.events}
                        />
                        :null}
                    </Content>
                    
               <BottomNavigation navigation={this.props.navigation} screenName='AlertView' />       
            </Container>
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

const mapStateToProps = state => {
  return { events: state.eventsReducer };
};

export default connect(mapStateToProps)(AlertView);
