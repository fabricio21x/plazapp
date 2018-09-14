import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import { Root, Body, Left, Right, Icon, Button, Header, Title, H1, H3, ActionSheet, Container, Content } from 'native-base';


export default class EventDetail extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
  }




  render() {
    const { params } = this.props.navigation.state;
    const event = params.item;
    console.log(event.name);
    
    return (
      <Root>
        <Container style={Styles.container}>
            <Header style={{ height: 40, backgroundColor: '#ffffff', justifyContent: 'space-between' }}>
              <Left >
                <Button transparent>
                    <Icon type='Feather' name='chevron-left' style={{ fontSize: 30, color: 'gray' }} onPress={() => this.props.navigation.goBack()} />
                </Button>
              </Left>
              <Body>
                  <Title style={Styles.titleHeader}> Detalle del Evento </Title>
              </Body>
            </Header>
            <Content>
              <ScrollView>
                <View style={Styles.imageContainer}>
                    <Image style={Styles.eventImage} source={{ uri: event.banner }}/>
                </View>
                <H1 style={Styles.title} >{event.name} </H1>
                <View style={Styles.section} >
                  <Text style={Styles.titlesection}>Ubicación: </Text>
                  <Text style={Styles.text}>{event.location}  </Text>
                </View>
                <View style={Styles.section} >
                  <Text style={Styles.titlesection}>Fecha:</Text>
                  <Text style={Styles.text}>{event.event_date}  </Text>
                </View>
                <View style={Styles.section}>
                  <Text style={Styles.titlesection}>Horario: </Text>
                  {event.all_day?
                    <Text style={Styles.text}> Todo el día </Text>
                  :<View>
                    <Text style={Styles.text}> {event.initial_time} </Text>
                    <Text style={Styles.text}> {event.final_time} </Text>              
                  </View>
                }
                </View>          
          
              </ScrollView>
            </Content>
        </Container>
      </Root>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
  },
  titleHeader:{
    color: '#000000' ,
    alignSelf: 'flex-start'
  },
  title:{
      paddingTop: 10,
      marginLeft:5,
      color: 'black',
      alignSelf: 'center',
      justifyContent: 'center',
      fontSize: 25,
      fontWeight: 'bold',
      flexDirection: 'row',
  },
  titlesection: {
      marginTop: 5,
      marginLeft: 10,
      marginRight: 10,
      fontSize: 18,
      fontWeight: 'bold'
  },
  section: {
        marginTop: 10,
        borderTopWidth: 1,
        borderColor: 'gray',
        flexDirection: 'column',
  },
 seccionTitle: {
      color: 'black',
      marginLeft: 20,
      fontSize: 20,
      width:100
  },
  text: {
      color: 'gray',
      fontSize:18,
      alignSelf: 'center',      
      justifyContent: 'center',
  },
  textButton: {
    fontSize: 13,
    color: '#ffffff'
  },
  imageContainer: {
      flexDirection: 'row',
      marginTop:5,
      justifyContent: 'center',
      backgroundColor: 'white'
  },
  eventImage: {
      width: 250,
      height: 250,
  }
});

