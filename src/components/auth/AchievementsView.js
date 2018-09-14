import React, { Component } from 'react';
import { Alert, View, ScrollView, FlatList, TouchableWithoutFeedback, Image, StyleSheet } from 'react-native';
import { Text, Button, Container, Content,List, Card, Header, Left, Icon, Body, Right, Title, ListItem } from 'native-base';
import { connect } from 'react-redux';
import { loadAchievements } from '../../actions/achievements';

class AchievementsView extends Component {
   
    static navigationOptions = {
        header: null
    };
 
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.dispatch(loadAchievements());
    }

    auxRenderItem(myItem) {
        console.log(myItem.spanish_name);
        return (
            <ListItem icon style={{flexDirection:'row'}}>
                <Left>
                    <Icon type="MaterialCommunityIcons" name="gift" style={{ fontSize: 20, color: 'blue' }} />
                </Left>
                <Body>
                    <Text>{myItem.spanish_name}</Text>
                </Body>
                <Right>
                    <Text >{myItem.amount}</Text>
                </Right>
               
          </ListItem>
        );
      }


    render() {
        const {achievements}=this.props.achievements;
        console.log(achievements.points_menus);
        return (
            <Container >
                    <Header>
                        <Left>
                            <Button transparent>
                                <Icon type='Feather' name='chevron-left' style={{ fontSize: 20 }} onPress={() => this.props.navigation.goBack()} />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Logros</Title>
                        </Body>
                        <Right/>
                    </Header>
                    <Content>
                        <View>
                            <Text style={myStyles.text}>¡Descrube todos los puntos que puedes conseguir usando la aplicación para subir de nivel y obtener promociones exclusivas de la aplicación!</Text>
                        </View>
                    {achievements.points_menus ? 
                        <FlatList
                            vertical
                            ItemSeparatorComponent={() => <View style={{ width: 2 }} />}
                            renderItem={({ item }) => this.auxRenderItem(item)}
                            data={achievements.points_menus}
                            />
                    :null}
   
                    </Content>      
            </Container>
        );
    }
}



const myStyles = StyleSheet.create({

    itemContainer: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: 'gray',
      elevation: 1,
      marginRight: 5,
      marginTop: 10,
      backgroundColor: 'white',
      alignContent: 'center',
      alignSelf: 'center'
    },
    text: {
        color: 'gray',
        marginLeft: 20,
        marginRight: 20,
        marginTop:20,
        marginBottom:20
    },
    list: {
        flex: 1,
    }

});

const mapStateToProps = state => {
    return { achievements: state.achievementsReducer };
};

export default connect(mapStateToProps)(AchievementsView);
