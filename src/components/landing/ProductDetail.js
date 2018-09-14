import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Root, Body, Left, Right, Icon, Button, Header, Title, H1, H3, ActionSheet } from 'native-base';
import { getUserToken } from '../../utils/storage'; 
import { resetAction } from '../../constants/reset';
//import { mystores } from '../../api/api';

export default class ProductDetail extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.actionSheet = null;
    this.state = {
      loadingState: 'initial',
      isFinishedLoading: false,
      favProdIds: [],
      heartPressed: false,
    };
  }

  componentWillMount() {
    this.loadFavorites();
  }

  componentDidMount() { 
    ActionSheet.actionsheetInstance = null; 
  }

  sendCheckedProduct(product) {
    var request = new XMLHttpRequest();
    request.open('POST', 'http://200.16.7.150:8083/api/v1/products/reviewed_products?product=' + product.id.toString());
    getUserToken().then((token) => { 
      request.setRequestHeader('Authorization', token);
      request.setRequestHeader('Content-Type', 'application/json');
      request.setRequestHeader('Accept', 'application/json');

      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          console.log('Status:', this.status);
          console.log('Headers:', this.getAllResponseHeaders());
          console.log('Body:', this.responseText);
        }
      };
      var body = {};
      body["message"] = "Se guardo la revision del producto exitosamente";
      request.send(JSON.stringify(body)); 
    });
  }


  showActionSheet(myStore) {
    const { navigate } = this.props.navigation;
    const buttons = ['Ver tienda', 'Ir a Home', 'Cancelar'];
    const cancelIndex = 2;

    if (this.actionSheet !== null) {
        this.actionSheet._root.showActionSheet(
                { options: buttons,
                  cancelButtonIndex: cancelIndex
                }, 
                buttonIndex => {
                    if (buttonIndex == 0) {
                        navigate('StoreDetail', { item: myStore });
                    } else if (buttonIndex == 1) {
                        navigate('Home');
                    }
                }
        );
    }
  }

  
  loadFavorites() {
    var request = new XMLHttpRequest();
    var changeState = this.setState.bind(this);
    request.open('GET', 'http://200.16.7.150:8083/api/v1/products/favorites');
    getUserToken().then((token) => {          
          request.setRequestHeader('Authorization', token);
          request.setRequestHeader('Content-Type', 'application/json');
          request.setRequestHeader('Accept', 'application/json');

          request.onreadystatechange = function () {
            if (this.readyState === 4) {

              var requestResponse = JSON.parse(this.responseText);
              if ('error' in requestResponse) {
                Alert.alert(this.responseText);  
              } else {
                try{
                  var newArr = [];
                  newArr = requestResponse.products.map(prod => prod.id);
                  changeState({
                    favProdIds: newArr,
                  },() => {
                    return;
                  })  
                }catch(err){
                  return;
                }
              }
            }
          };
          request.send();
      });
  }
  

  saveFavorites(myItem, op) {
    var request = new XMLHttpRequest();
    var post_url = ' ';
    if (op == 'like') {
      post_url = 'http://200.16.7.150:8083/api/v1/products/like';
    } else {
      post_url = 'http://200.16.7.150:8083/api/v1/products/dislike';
    }
    request.open('POST', post_url);
    var userToken = '';
    getUserToken().then((token) => {
        userToken = token;
        request.setRequestHeader('Authorization', userToken);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Accept', 'application/json');

        request.onreadystatechange = function () {
          if (this.readyState === 4) {
          }
        };

        var body = {};
        var sub_body = {};
        sub_body["product_id"] = parseInt(myItem.item.id);
        body["favorite_product"] = sub_body;
        request.send(JSON.stringify(body));
    });
  }


  onPressHearts(myItem) {
    const itemId = myItem.item.id;
    var op = ' ';
    var newArr = this.state.favProdIds.slice(); // obtainning new clone of list
    if (this.state.favProdIds.includes(itemId)){
      op = 'dislike';
      newArr = newArr.filter(item => item !== itemId)
    } else {
      op = 'like';
      newArr.push(itemId);
    }
    this.saveFavorites(myItem, op);
    this.setState({
        heartPressed: this.state.heartPressed ? false : true,
        favProdIds: newArr,
      });
  }
  
  auxRenderItem(myStore) {
    console.log('Tienda');
    console.log(myStore);
    return (
      <View style={Styles.section}>
          <Text style={Styles.seccionTitle}> eee </Text>
          <Text style={Styles.text}>{myStore.name}</Text>
          <Text style={Styles.text}>{myStore.webpage} </Text>
          <Text style={Styles.text}>{myStore.phone_number} </Text>
      </View>
    );
  }

  render() {
    const { params } = this.props.navigation.state;
    const product = params.item;
    const screen = params.screen;
    this.sendCheckedProduct(product);
    //favorites={this.state.favProdIds}
    let isfavourite = this.state.favProdIds.includes(product.id);
    

    return (
      <Root>
        <View style={Styles.container}>
            <Header style={{ height: 40, backgroundColor: '#ffffff' }}>
              <Left >
                <Button transparent>
                    <Icon type='Feather' name='chevron-left' style={{ fontSize: 30, color: 'gray' }} onPress={() => this.props.navigation.goBack()} />
                </Button>
              </Left>
              <Body>
                  <Title style={{ color: '#000000', alignSelf: 'flex-start'}}> Detalle de Producto </Title>
              </Body>
            </Header>
            <ScrollView>
            <View style={Styles.imageContainer}>
                <Image style={Styles.productImage} source={{ uri: product.image }} />
                <TouchableWithoutFeedback onPress={() => this.onPressHearts({ item: product })}>
                  <Icon 
                    type='MaterialCommunityIcons'
                    name={(isfavourite) ? "heart" : "heart-outline"}
                    size={30}
                    style={(isfavourite) ? Styles.favourite : Styles.noFavourite}
                  />
                </TouchableWithoutFeedback>
              </View>

              <View >
                  <H1 style={Styles.title} >{product.name} </H1>
                  <Text style={Styles.text}> {product.technical_specification.description} </Text>
              </View>
              <H3 style={Styles.storesTitlesection}>Disponible en </H3>
                <View style={Styles.section}>
                  <View style={Styles.storeInfo}>
                    <Text style={Styles.seccionTitle}>  S/. {product.price}</Text>
                    <Text style={Styles.text}>{product.store.name}</Text>
                    <Text style={Styles.text}>{product.store.webpage} </Text>
                    <Text style={Styles.text}>{product.store.phone_number} </Text>
                  </View>

                  <Right>
                      <Button 
                        transparent
                        onPress={() => this.showActionSheet(product.store)}    
                      >
                      <Icon type='Entypo' name='dots-three-horizontal' style={{ fontSize: 30, color: 'gray' }}/>
                        </Button>
                        <ActionSheet ref={(c) => { this.actionSheet = c; }} />
                  </Right>
                </View>
            </ScrollView>
        </View>
      </Root>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: 'white',
  },
  buttonHabilitado: {
    marginTop: 40,
    width: 100,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f74e0',
    borderColor: '#0f74e0',
    borderWidth: 2
  },
  title: {
      color: 'black',
      marginLeft: 20,
      marginRight: 20,
      fontSize: 20,
      fontWeight: 'bold'
  },
  storesTitlesection: {
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      fontSize: 18,
  },
  section: {
        marginBottom: 10,
        borderTopWidth: 1,
        borderColor: 'gray',
        flexDirection: 'row',
  },
  storeInfo: {
    flexDirection: 'column',
  },
 seccionTitle: {
      color: 'black',
      marginTop: 10,
      marginLeft: 20,
      marginRight: 20,
      marginBottom:5,
      fontSize: 20,
  },
  text: {
      color: 'gray',
      marginLeft: 20,
      marginRight: 20,
  },
  textButton: {
    fontSize: 13,
    color: '#ffffff'
  },
  imageContainer: {
      //flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: 'white'
  },
  productImage: {
      width: 250,
      height: 250,
  },
  noFavourite: {
    position: 'absolute',
    right: 1,
    top:3,
    color:'gray'
  },
  favourite:{ 
    color: 'red', 
    position: 'absolute',
    right: 1, 
    top: 3
  }
  
});


/*
  <FlatList
                      vertical
                      ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
                      renderItem={({ item }) => this.auxRenderItem(item)}
                      data={product.store}
  />
               
*/
