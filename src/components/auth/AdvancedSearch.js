import React, { Component } from 'react';
import { TextInput, StyleSheet, Dimensions, View, ScrollView, FlatList, Switch, Item, TouchableOpacity } from 'react-native';
import { Container, 
         Body, 
         Left, 
         Right, 
         Header, 
         Icon, 
         Button, 
         Text, 
         Title, 
         List, 
         ListItem,
         CheckBox, 
         Radio } from 'native-base';

import { connect } from 'react-redux';
import { loadProdCategories } from '../../actions/productCategories';

const { width, height } = Dimensions.get('window')

class AdvancedSearch extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        console.log('get data');
        this.state = {
            text: '',
            data: '',
            status: false,
            arr: [],
            minPrice: 1,
            maxPrice: 9000
        };
    }

    componentWillMount() {
        this.props.dispatch(loadProdCategories());
    }

    componentWillReceiveProps(nextProps) {
        const { prodCategories } = nextProps.prodCategories;
        if (prodCategories.product_categories) {
            this.setState({ data: prodCategories.product_categories });
        }
    }

    filter(text) {
        const { prodCategories } = this.props.prodCategories;
        const newData = prodCategories.product_categories.filter(function(item) {
            const itemData = item.name.toUpperCase();
            const textData = text.toUpperCase();
            console.log(itemData);
            console.log(textData);
            console.log(itemData.indexOf(textData) > -1);
            return itemData.indexOf(textData) !== -1;
        });
        this.setState({
            data: newData,
            text: text
        });
    }

    deleteData() {
        this.setState({ text: '', data: '' });
    }

    changeState(id) {
        let index = 0;
        let array = [];
        let statustwo = false; 
        statustwo = this.state.status;
        array = this.state.arr;
        console.log(id);    
        if (!array.includes(id)) {
            array.push(id);
        } else {
            console.log('ENTREEEEEEEE');
            array.splice(array.indexOf(id), 1);
        }
        
        this.setState({
            status: this.state.status ? false:true,
            arr: array
        });

        console.log(this.state.arr);
        console.log(this.state.status);
        console.log(id);
    }

    _renderItem(item) {
        console.log(this.state.status);
        const { checked } = this.state.status;
        return (
            <View style={{ flexDirection: 'row' }}>
                <CheckBox onPress={() => this.changeState(item.id)} checked={(this.state.arr.includes(item.id)) ? true : false} />
                <Text style={{ marginLeft: 20 }}>{item.name}</Text>
            </View>
        );
    }

    renderList(prodCategories) {
        return (
            <FlatList
                extraData={this.state.status}
                data={prodCategories.product_categories}
                renderItem={({ item }) => this._renderItem(item)}
            />
        );
    }
/*
    renderList(prodCategories) {
        console.log(this.state.status);
        return (
            <FlatList 
            <List dataArray= {this.state.data}
                renderRow={(item) =>
                <ListItem>
                    <CheckBox
                        onPress={() => this.changeState(item.id)}
                        checked={this.state.status} />  
                    <Text>{item.name}</Text>
                </ListItem>
            }>
            </List>
        )
    }
*/
    PressDone() {
        let array = [];
        let mPrice = 0;
        let mxPrice = 0;
        array = this.state.arr;
        mPrice = this.state.minPrice;
        mxPrice = this.state.maxPrice;
        console.log(array);
        console.log(mPrice);
        console.log(mxPrice);
        /*for (let i = 0; i < array.length; i++) {
            prodByProductsCategories(array[i], mPrice, mxPrice);
        }*/
        this.props.navigation.navigate('Results', { arr: array, miniPrice: mPrice, maxiPrice: mxPrice });
    }

    render() {
        const { prodCategories } = this.props.prodCategories;
        const { navigate } = this.props.navigation;
        const { array } = this.state.arr;
        return (
            <Container style={{ backgroundColor: '#ffffff' }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <Header searchBar rounded>
                            <Left>
                                <Button transparent>
                                    <Icon type='Feather' name='chevron-left' style={{ fontSize: 20 }} onPress={() => this.props.navigation.goBack()} />
                                </Button>
                            </Left>
                            <Body><Title style={{ marginLeft: 40 }}> Productos </Title></Body>
                            <Right>
                                <Button transparent style={{ borderBottomWidth: 0 }} onPress={() => this.PressDone()}>
                                    <Text style={{ fontSize: 15 }}> Listo </Text>
                                </Button>
                            </Right>
                        </Header>
                        <View style={styles.container}>
                            <Icon name="ios-search" style={{ fontSize: 20, padding: 5 }} />
                            <TextInput
                                value={this.state.text}
                                onChangeText={(text) => this.filter(text)}
                                alignItems='center'
                                style={styles.input}
                                placeholder="Buscar"
                            />
                            <Icon name="ios-people" style={{ fontSize: 20, padding: 5, paddingLeft: 10, paddingRight: 20 }} />
                        </View>
                        <View style={{ color: 'white' }}>
                            {prodCategories.product_categories ? this.renderList(prodCategories) : null}
                        </View>
                        <Text style={{ marginTop: 15, marginLeft: 25 }}>Precio</Text>
                        <View style={{ color: '#ffffff' }}>
                            <View style={styles.priceStyle}>
                                <View style={{ color: '#ffffff' }}>
                                    <TextInput
                                        style={styles.inputT}
                                        placeholder=""
                                        onChangeText={(minPrice) => this.setState({ minPrice })}
                                        value={this.state.minPrice}
                                    />
                                </View>
                                <Text style={{ marginLeft: 10, marginTop: 10 }}>-</Text>
                                <View style={{ color: '#ffffff' }}>
                                    <TextInput
                                        style={styles.inputT}
                                        placeholder=""
                                        onChangeText={(maxPrice) => this.setState({ maxPrice })}
                                        value={this.state.maxPrice}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        height: 35,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        backgroundColor: '#ffffff',
        width: width / 2,
        marginHorizontal: 10,
        paddingLeft: 10,
        borderRadius: 3
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    priceStyle: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        paddingLeft: 18
    },
    body: {
        marginTop: 15,
        marginLeft: 20,
        color: 'white', 
        fontSize: 12
    },
    inputT: {
        marginLeft: 1,
        fontSize: 15
    }
});

const mapStateToProps = state => {
    return { prodCategories: state.prodCategoriesReducer };
};

export default connect(mapStateToProps)(AdvancedSearch);
