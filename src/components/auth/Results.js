import React, { Component } from 'react';
import { Alert, View, ScrollView, FlatList, TouchableWithoutFeedback, Image, StyleSheet } from 'react-native';
import { Text, Button, Container, List, Header, Left, Icon, Body, Right, Title } from 'native-base';
import { connect } from 'react-redux';
import { prodByProductsCategories } from '../../actions/productsAdvanced';

class Results extends Component {
   
    static navigationOptions = {
        header: null
    };
 
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            string: ''
        };
    }
    componentWillMount() {
        let minPrice = 0;
        let maxPrice = 0;
        this.state.data = this.props.navigation.state.params.arr;
        minPrice = this.props.navigation.state.params.miniPrice;
        maxPrice = this.props.navigation.state.params.maxiPrice;
        let stringAux = this.state.string;
        for (let i = 0; i < this.state.data.length; i++) {
            if (i !== (this.state.data.length - 1)) {
                stringAux = `${stringAux + this.state.data[i]},`;
            } else {
                stringAux += this.state.data[i];
            }
        }
        console.log(stringAux);
        this.props.dispatch(prodByProductsCategories(stringAux, minPrice, maxPrice));
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

    renderList(prodAdv) {
        console.log('ENTREEEEEEEEEEEEEEEEE');
        return (
            <FlatList
                style={myStyles.list}
                data={prodAdv.products}  /* Categoría 2 */
                renderItem={({ item }) => this.auxRenderItem(item)}
            />
        );
    }

    render() {
        const { prodAdv } = this.props.prodAdv;
        console.log(prodAdv.products);
        return (
            <Container style={{ backgroundColor: '#ffffff' }}>
                    <View style={{ flex: 1 }}>
                        <Header searchBar rounded>
                            <Left>
                                <Button transparent>
                                    <Icon type='Feather' name='chevron-left' style={{ fontSize: 20 }} onPress={() => this.props.navigation.goBack()} />
                                </Button>
                            </Left>
                            <Body><Title style={{ marginLeft: 40 }}> Resultado </Title></Body>
                            <Right />
                        </Header>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            {prodAdv.products ? this.renderList(prodAdv) : null}
                        </View>
                    </View>
            </Container>
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
      backgroundColor: 'white',
      alignContent: 'center',
      alignSelf: 'center'
    },
    list: {
        flex: 1,
    }
});

const mapStateToProps = state => {
    return { prodAdv: state.advProdReducer };
};

export default connect(mapStateToProps)(Results);
