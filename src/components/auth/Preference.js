import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image ,Alert, FlatList, ScrollView} from 'react-native';
import { List, Text, ListItem, Left, Right, Body, Container } from 'native-base';

import { connect } from 'react-redux';
import { loadCategories } from '../../actions/storeCategories';
import { insertPreferencesCat } from '../../actions/preferencesCateg';
import Loader from '../parking/Loader';
import { getUserToken } from '../../utils/storage';

let estado = false;

class Preference extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = { 
            buttonPressed: false,
            index: [],
            //numEscog: 0,
            count: 0,
            flag: false,
            ind: 0,
            text: '',
            data: '', 
            gotoHome: '',
            loading: 'pre-initial',
            preference: [], };
    }

    componentWillMount() {
        this.props.dispatch(loadCategories())
        .then((success1) => {
            if (success1) {
              this.setState({ loading: 'initial' });
            }
        });

        //this.loadAllPreferences();
    }

    loadAllPreferences() {
        var request = new XMLHttpRequest();
        var changeState = this.setState.bind(this);
        request.open('GET', 'http://200.16.7.150:8083/api/v1/store_categories');
        getUserToken().then((token) => {
              console.log('TOKEN: ' + token);         
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
                      newArr = requestResponse.store_categories.map(item => item);
                      console.log('PREFERENCIAS');
                      console.log(newArr);
                      changeState({
                        preference: newArr,
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

    onPressButton(id) {
        console.log('Inside onPressButton');
        const esta = false;
        let flag = false;
        let ind = 0;
        let estadoF = false;
        let indexes = [];
        let cont = 0;
        flag = this.state.flag;
        ind = this.state.ind;
        cont = this.state.count;
        estadoF = estado;
        console.log(estado);
        indexes = this.state.index;
        estadoF = esta;
        for (let i = 0; i < indexes.length; i++) {
            if (id === indexes[i]) { //Buscar si el id de la categoria esta en el arreglo
                flag = true;
                ind = i;
            }
        }
        //Alert.alert(flag);
        console.log(id);        
        if (flag) { //Si el id de la categoria SI esta en el arreglo
            delete indexes[ind];
            estadoF = false;
            estado = estadoF;
            cont -= 1;        
        } else { //Si el id de la categoria NO esta en el arreglo
            estadoF = true;
            estado = estadoF;
            indexes.push(id);
            cont += 1;
        }
        this.setState({ 
            index: indexes,
            buttonPressed: this.state.buttonPressed ? false:true,            
            count: cont });
        console.log(estado);
        console.log(this.state.buttonPressed);
    }

    handleHome() {
        const indexes = this.state.index;
        var selectedPreferences = 0;
        for (let i = 0; i < indexes.length; i++) {
            var body = {};
            var sub_body = {};
            sub_body["store_category_id"] = parseInt(indexes[i]);
            body["preference_store_category"] = sub_body;
            console.log('CADA ELEMENTO');   ///////////////////////////////////////////////////////////////
           console.log(body);
            this.props.dispatch(insertPreferencesCat(body))
            .then((success) => {
                if (success) {
                    selectedPreferences += 1;
                    if (selectedPreferences == 3){
                        this.setState({ gotoHome:'go' });
                    };
                }
            })
        }
    }

    shouldComponentUpdate(){
        return true;
    }

    componentDidUpdate(){       
        if( this.state.gotoHome=="go"){
            var lastScreen = 'Home';
            this.props.navigation.navigate('Home', { lastScreen });
            // this.props.navigation.navigate('Perfil');
        }
    }

    
    renderMyItem(item) {      
        return (
            <View>
                <TouchableOpacity onPress={() => this.onPressButton(item.id)}>
                    <View style={(this.state.index.includes(item.id)) ? Styles.buttonPress : Styles.buttonNoPress}>
                        <Image style={Styles.image} source={{ uri: item.icon }} />
                        <Text>{item.name}</Text>    
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderList(categories) {
        return (
            <FlatList
                extraData={this.state.buttonPressed}
                data={categories.store_categories}
                renderItem={({item}) => this.renderMyItem(item)}
            >
            </FlatList>
        );
    }

    render() {
        console.log('LOADING');
        console.log(this.state.loading);
        if (this.state.loading === 'initial') {
        //if (this.state.preference.length > 0) {
            const cant = this.state.count;
            const { categories } = this.props.categories;
            console.log('CATEGORIAS');
            console.log(categories);
            return (
                <View>
                    <Text style={Styles.textTitle}> Ayúdanos a conocerte mejor </Text>
                    <Text style={Styles.textBody}> Escoge las categorias que más te gustan (SOLO: 3) </Text>
                    <ScrollView style={Styles.scrollableContainer}>
                        <FlatList  
                            renderItem={({ item }) => this.renderMyItem(item)}
                            data={categories.store_categories}
                            extraData={this.state.buttonPressed}
                        />
                    </ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={() => this.handleHome()} key={7} >
                            <View style={(cant < 3 | cant > 3) ? Styles.buttonDeshabilitado : Styles.buttonHabilitado} >
                                <Text style={Styles.textButton}> {'Continuar'} </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        return (
            <View>
            <Text style={Styles.textTitle}> Ayúdanos a conocerte mejor </Text>
            <Text style={Styles.textBody}> Escoge las categorias que más te gustan (SOLO: 3) </Text>
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
    return { categories: state.categoriesReducer }
};

export default connect(mapStateToProps)(Preference);
