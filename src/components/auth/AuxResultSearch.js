import React, { Component } from 'react';
import { AsyncStorage, Alert, View, TouchableWithoutFeedback, Image, StyleSheet, FlatList, ListView } from 'react-native';
import { Text, Button, Container, List, Left, Right } from 'native-base';
import { connect } from 'react-redux';
import { loadProducts } from '../../actions/products';
import Loader from '../parking/Loader';

class AuxResultSearch extends Component {
   
    static navigationOptions = {
        header: null
    };
 
    constructor(props) { //corregir constructor
        super(props);
        this.state = {
            data: [],
            text: this.props.parametro, //SE PONE POR DEFAULT
            producto_seleccionado: '',
            data_recent_search: [{ name: '' }],
            isFinishedLoading: false
        };
    }
 
   
    componentWillMount() {
        this.props.dispatch(loadProducts());
    }
 
    componentWillReceiveProps(nextProps) {
        // NO ES NECESARIO ASIGNARLO A STATE, YA ESTÁ EN PROPS
        console.log(nextProps.products);
        if (!(nextProps.products.isFetching === false && 
        nextProps.products.error === false)) {
            return;
        }
        const { products } = nextProps.products;
        if (products.products) {
            this.setState({ 
                data: products.products,
                isFinishedLoading: true });
        }
    }
   

    helperFilter() {
        const { products } = this.props.products;
        const myArray = products.products; //se usa los products que están el props
        const myText = this.props.parametro;
        const myTextoUp = myText.toUpperCase();
        var miArrayFiltrado = [];
        try {
            miArrayFiltrado = myArray.filter(function(data){
            return data.name.toUpperCase().includes(myTextoUp);
            });    
        } catch(err) {
            return [];
        }
        
        return miArrayFiltrado;
    }
 
    afterSelect(myItem) {
        const arrayData = [];
        const { navigate } = this.props.navigation;
        //aqui vamos a guardar el producto seleccionado
        this.setState({ producto_seleccionado: myItem.name }); 
        const datobuscado = {
            name: myItem.name
        };
        arrayData.push(datobuscado);
        AsyncStorage.getItem('local_db').then((value) => {
            if (value !== null) {                 
                const d = JSON.parse(value);                          
                d.push(datobuscado);  
                AsyncStorage.setItem('local_db', JSON.stringify(d)).then(() => {                      
                    this.setState({ data_recent_search: [...this.state.data_recent_search, { name: myItem.name }] }); 
                });  
            } else {
                AsyncStorage.setItem('local_db', JSON.stringify(arrayData)).then(() => {
                    this.setState({ data_recent_search: [...this.state.data_recent_search, { name: myItem.name }] }); 
                });
            }
        });
        navigate('ProductDetail', { item: myItem });
    }

    auxRenderItem(myItem) {
        return (
          <View style={myStyles.itemContainer}>       
            <Left style={{ marginLeft: 20 }}>
                <TouchableWithoutFeedback onPress={() => this.afterSelect(myItem)}>
                  <Image style={myStyles.image} source={{ uri: myItem.image }} />
                </TouchableWithoutFeedback>
            </Left>
            <Right>
                <Text style={myStyles.description} >{myItem.name}</Text>
            </Right>
          </View>
        );
      }
   
    renderList() {        
        //const valorAbuscar = this.props.parametros; -> se corregirá en el constructor
        //this.setState({ text: valorAbuscar }); -> no es necesario ya está en el estado
        const datafiltrada = this.helperFilter();
        console.log(datafiltrada);
        return (
            <FlatList
                style={myStyles.list}
                data={datafiltrada}  /* Categoría 2 */
                renderItem={({ item }) => this.auxRenderItem(item)}
            />   
        );
    }

    didComponentFinishedLoading() {
        if (this.state.isFinishedLoading === true) {
            return (
                <Container >
                    <View style={{ flex: 1 }} >
                        <Text style={{ fontSize: 20, marginTop: 10 }}> Resultados </Text>
                        {this.renderList()}        
                    </View>
                </Container>
            );
        }

        return (
            <View>
            <Loader />
            </View>
            );
    }
 
    render() {
        //const { products } = this.props.products; -> NO ES NECESARIO
        console.log('ENTRE A AUXRESULTSEARCH');
        return this.didComponentFinishedLoading();
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
      alignSelf: 'center'
    },
    list: {
        flex: 1,
    }
});
 
const mapStateToProps = state => {
    return { products: state.productsReducer };
};
 
export default connect(mapStateToProps)(AuxResultSearch);
