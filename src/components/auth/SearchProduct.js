import React, { Component } from 'react';
import { TextInput, StyleSheet, Dimensions, View } from 'react-native';
import { Container, Body, Left, Right, Header,
         Icon, Button, Text, Title, Thumbnail, List } from 'native-base';
import BottomNavigation from '../auth/bottomNavigation';
import { getAllCategories } from './../../api/api';

import { connect } from 'react-redux';
import { loadProducts } from '../../actions/products';

const { width, height } = Dimensions.get('window')

class SearchProduct extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            data: ''
        };
    }

    componentWillMount() {
        this.props.dispatch(loadProducts());
    }

    componentWillReceiveProps(nextProps) {
        const { products } = nextProps.products;
        if (products.products) {
            this.setState({ data: products.products });
        }
    }

    filter(text) {
        const { products } = this.props.products.products;
        console.log('Entro al filter');
        console.log(products);
        const newData = products.filter(function(item) {
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

    renderItem(item) {
        return (
            <View>
                <Button transparent light>
                    <Text style={{ color: 'gray' }}>{item.name}</Text>
                </Button>
            </View>
        );
    }

    renderList(products) {
        return (
            <List
                dataArray={this.state.data}
                renderRow={(item) => this.renderItem(item)}
            >
            </List>
        );
    }

    render() {
        const uri= 'https://facebook.github.io/react-native/docs/assets/favicon.png';
        const { products } = this.props.products;
        return (
            <Container style={{ backgroundColor: '#ffffff' }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <Icon name="ios-search" style={{ fontSize: 20, color: 'gray', padding: 5, paddingLeft: 10 }} />
                        <TextInput
                            value={this.state.text}
                            onChangeText={(text) => this.filter(text)}
                            alignItems='center'
                            style={styles.input}
                            placeholder="Buscar"
                            placeholderColor="gray"
                        />
                        <Icon name="ios-people" style={{ fontSize: 20, color: 'gray', padding: 5, paddingLeft: 10 }} />
                        <Button transparent>
                            <Text style={{ color: 'gray', fontSize: 12 }}>Cancelar</Text>
                        </Button>                 
                    </View>
                    <View>
                        {products.products ? this.renderList(products) : null}
                    </View>
                </View>
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
        paddingLeft: 5,
        borderRadius: 3
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        marginTop: 5
    },
    header: {
        backgroundColor: '#ffffff', 
        flexDirection: 'row', 
        justifyContent: 'center'
    }
});

const mapStateToProps = state => {
    return { products: state.productsReducer };
};

export default connect(mapStateToProps)(SearchProduct);
