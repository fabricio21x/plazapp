import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Image, ScrollView , TouchableWithoutFeedback} from 'react-native';
import { Root, Container, Body, Left, Right, Header, 
         Icon, Button, Title, H1, H3, Text, ActionSheet } from 'native-base';

const { width, height } = Dimensions.get('window');

export default class StoreDetail extends Component {
    static navigationOptions = {
        header: null
    }

    componentDidMount() { 
        ActionSheet.actionsheetInstance = null; 
    }

    constructor(props) {
        super(props);
        this.actionSheet = null;
    }

    showActionSheet() {
        const { navigate } = this.props.navigation;
        const buttons = ['Ir a Home', 'Ir a Buscar', 'Cancelar'];
        const cancelIndex = 2;

        if (this.actionSheet !== null) {
            // Call as you would ActionSheet.show(config, callback)
            this.actionSheet._root.showActionSheet(
                    { options: buttons,
                      cancelButtonIndex: cancelIndex
                    }, 
                    buttonIndex => {
                        if (buttonIndex == 0) {
                            navigate('Home');
                        } else if (buttonIndex == 1) {
                            navigate('RecentSearch');
                        }
                    }
                );
        }
    }


    render() {
        const { params } = this.props.navigation.state;
        const store = params.item;
        return (
            <Root>
            <View style={styles.container} >
                    <Header style={{ height: 40, backgroundColor: '#ffffff' }}>
                        <Left >
                            <Button transparent>
                                <Icon type='Feather' name='chevron-left' style={{ fontSize: 30, color: 'gray' }} onPress={() => this.props.navigation.goBack()} />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{ color: '#000000' , alignSelf: 'flex-start'}}> Detalle de Tienda </Title>
                        </Body>
                    </Header>
                <ScrollView>
                    <View style={styles.storeImage}>
                        <Image style={styles.image} source={{ uri: store.banner }} />
                    </View>
                        <View style={styles.storeLogo}>
                            <Image style={styles.image} source={{ uri: store.logo }} />
                            <Right>
                                <Button 
                                    transparent
                                    onPress={() => this.showActionSheet()}    
                                >
                                    <Icon type='Entypo' name='dots-three-horizontal' style={{ fontSize: 30, color: 'gray' }}/>
                                </Button>
                                <ActionSheet ref={(c) => { this.actionSheet = c; }} />
                            </Right>
                        </View>
                    
                    <View style={styles.section}>
                        <H1 style={styles.seccionTitle} >{store.name} </H1>
                        <Text style={styles.text}> {store.description}</Text>
                    </View>

                    <View style={styles.section}>
                        <H3 style={styles.seccionTitle}>Contacto </H3>
                        <Text style={styles.text}> ---- </Text>
                        <Text style={styles.text}> {store.webpag} </Text>
                        <Text style={styles.text}>{store.phone_number} </Text>
                    </View>

                    <View style={styles.sectionMap}>
                        <H3 style={styles.seccionTitle}> Ver en mapa </H3>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('HomeScreen', { idStore: store.id })}>
                            <Icon type='Feather' name='chevron-right' style={{ fontSize: 30, color: 'gray' }} />
                        </TouchableWithoutFeedback>
                    </View>

                </ScrollView>
            </View>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        color: 'gray',
        marginLeft: 20,
        marginRight: 20,
    },
    section: {
        marginBottom: 10,
        borderTopWidth: 1,
        borderColor: 'gray',
    },
    sectionMap: {
        flexDirection: 'row',
        marginBottom: 10,
        borderTopWidth: 1,
        borderColor: 'gray',
        justifyContent: 'space-between',
    },
    seccionTitle: {
        color: 'black',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
    },
    storeImage: {
        flex: 1,
        justifyContent: 'space-between', /* Reparte de manera homogénea cada elemento en todo el espacio definido */
        backgroundColor: '#ffffff',
        height: 150,
    },
    storeLogo: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        marginLeft: 20,
    },
    image: {
        flex: 1,
        width,
        resizeMode: 'contain'
    }
});
