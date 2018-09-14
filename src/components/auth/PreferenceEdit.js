import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image, FlatList, ScrollView } from 'react-native';
import { Text } from 'native-base';
import { connect } from 'react-redux';
import { loadCategories } from '../../actions/storeCategories';
import { loadPreferencesCat } from '../../actions/preferencesCateg';
import { resetAction } from '../../constants/reset';
import { getUserToken } from '../../utils/storage';
import Loader from '../parking/Loader';

//let beforeFirstRender = true;
class PreferenceEdit extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = { 
            buttonPressed: false,
            prevPref: [],
            index: [],      // Almacena los ids de los botones que han sido presionados
            count: 0,
            loading: 'pre-initial' };
    }


    componentWillMount() {
        this.props.dispatch(loadPreferencesCat())
        .then((success1) => {
            if (success1) {
                this.props.dispatch(loadCategories())
                .then((success2) => {
                    if (success2) {
                      this.setState({ loading: 'initial' });
                    }
                });
            }
        });
    }


    onPressButton(itemId) {
        console.log('Inside onPressButton');
        var operation = ' ';
        var newArr = this.state.index.slice(); // obtainning new clone of list
        
        if (this.state.index.includes(itemId)) {    // Si esta en el arreglo
          operation = 'delete';
          newArr = newArr.filter(item => item !== itemId);
        } else {
          operation = 'insert';
          newArr.push(itemId);
        }

        this.saveFavorites(itemId, operation);

        this.setState({
            buttonPressed: this.state.buttonPressed ? false : true,
            index: newArr,
            count: newArr.length,
        });
    }


    onPressCancelar() {
        for (let i = 0; i < this.state.index.length; i++) {
            this.saveFavorites(this.state.index[i], 'delete');
        }

        for (let i = 0; i < this.state.prevPref.length; i++) {
            this.saveFavorites(this.state.prevPref[i], 'insert');
        }
        
        this.props.navigation.dispatch(resetAction('Home', { lastScreen: 'Home' }));
        //this.props.navigation.navigate('Home');
    }

    onPressContinuar() {
        if (this.state.index.length >= 3) {
            //this.props.navigation.navigate('Home');
            this.props.navigation.dispatch(resetAction('Home', { lastScreen: 'Home' }));
        }
    }


    saveFavorites(itemId, operation) {
        var request = new XMLHttpRequest();
        var postUrl = ' ';
        if (operation == 'insert') {
            postUrl = 'http://200.16.7.150:8083/api/v1/store_categories/like';
        } else {
            postUrl = 'http://200.16.7.150:8083/api/v1/store_categories/dislike';
        }
        request.open('POST', postUrl);
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
            sub_body["store_category_id"] = parseInt(itemId);
            body["preference_store_category"] = sub_body;
            request.send(JSON.stringify(body));
        });
    }

    generateIndexPreferencesCategory(prefCategories) {
        let indexAux = [];
        for (let key in prefCategories) {
            indexAux.push(prefCategories[key].id);
            console.log('AQUI');
            console.log(indexAux);
        }

        if (indexAux.length == prefCategories.length) {
            this.setState({
                prevPref: indexAux, 
                index: indexAux,
                loading: 'loading',
                count: indexAux.length,
            });
        }
    }

    renderMyItem(item) {      
        return (
            <View>
                <TouchableWithoutFeedback onPress={() => this.onPressButton(item.id)}>
                    <View style={(this.state.index.includes(item.id)) ? Styles.buttonPress : Styles.buttonNoPress}>
                        <Image style={Styles.image} source={{ uri: item.icon }} />
                        <Text> {item.name} </Text>    
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    render() {
        const cant = this.state.count;
        const { categories } = this.props.categories;
        const { prefCategories } = this.props.prefCategories;
        console.log(categories);
        console.log(prefCategories);
        
        if (categories && prefCategories && (this.state.loading == 'initial')) {
            this.generateIndexPreferencesCategory(prefCategories);
        }

        if (categories && prefCategories && (this.state.loading == 'loading')) {
            return (
                <View>
                    <Text style={Styles.textTitle}> Cambiemos tus preferencias </Text>
                    <Text style={Styles.textBody}> Escoge las categorias que más te gustan </Text>
                    <ScrollView style={Styles.scrollableContainer}>
                        <FlatList  
                            renderItem={({ item }) => this.renderMyItem(item)}
                            data={categories.store_categories}
                            extraData={this.state.buttonPressed}
                        />
                    </ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={() => this.onPressCancelar()} key={8} >
                            <View style={Styles.buttonCancelar}>
                                <Text style={Styles.textButton}> {'Cancelar'} </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onPressContinuar()} key={7} >
                            <View style={(cant < 3) ? Styles.buttonDeshabilitado : Styles.buttonHabilitado} >
                                <Text style={Styles.textButton}> {'Continuar'} </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        return (
            <View>
            <Text style={Styles.textTitle}> Ayúdanos a conocerte mejor: Cambiemos tus preferencias </Text>
            <Text style={Styles.textBody}> Escoge las categorias que más te gustan </Text>
            <Loader />
            </View>
            
        );
    }
 }

 const Styles = StyleSheet.create({
    bigContainer: {
        marginBottom: 20
    },
    scrollableContainer: {
        height: 400,
    },
    textTitle: {
        marginTop: 15,
        fontSize: 20,
        color: 'grey',
        textAlign: 'center'
    },
    textBody: {
        marginTop: 5,
        marginBottom: 15,
        fontSize: 10,
        color: 'grey',
        textAlign: 'center'
    },
    buttonNoPress: {
        marginTop: 15,
        width: 250,
        height: 30,         
        borderRadius: 5,
        alignContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#d3d3d3',
        borderColor: '#d3d3d3',
        borderWidth: 2,
        flexDirection: 'row',
    },
    buttonPress: {
        marginTop: 15,
        width: 250,
        height: 30,         
        borderRadius: 5,
        alignSelf: 'center',
        backgroundColor: '#808080',
        borderColor: '#808080',
        borderWidth: 2,
        flexDirection: 'row',
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
    buttonDeshabilitado: {
        marginTop: 40,
        width: 100,
        height: 30,
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#d3d3d3',
        borderColor: '#d3d3d3',
        borderWidth: 2
    },
    buttonCancelar: {
        marginTop: 40,
        width: 100,
        height: 30,
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 2
    },
    textButton: {
        textAlign: 'center'
    },
    image: {
        width: 20,
        height: undefined,
        marginLeft: 25,
        marginRight: 20,
        //flex: 1,
    },
});

const mapStateToProps = state => {
    return { categories: state.categoriesReducer,
             prefCategories: state.preferencesCatReducer }
};

export default connect(mapStateToProps)(PreferenceEdit);
