import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    Dimensions,
		FlatList,
		Image,
		ImageBackground,
		Platform
} from 'react-native';
import {
	Container, 
	Text,
	Button
} from 'native-base';
import { NavigationActions } from 'react-navigation';

import AsyncImage from './../extras/AsyncImage';

const incidents = [
	{ name: 'Baño malogrado', type: 'baño_malogrado', 
		image: require('./../../images/bano.png'), color: '#4E899C' },
	{ name: 'Escalera malograda', type: 'escalera_malograda', 
		image: require('./../../images/escalera.png'), color: '#6B6B98' },
	{ name: 'Piso mojado', type: 'piso_mojado', 
		image: require('./../../images/piso-mojado.png'), color: '#FF0038' },
	{ name: 'Ascensor malogrado', type: 'ascensor_malogrado', 
		image: require('./../../images/ascensor.png'), color: '#688293' },
	{ name: 'Iluminación', type: 'iluminacion', 
		image: require('./../../images/iluminacion.png'), color: '#FBE680' },
	{ name: 'Tienda', type: 'tienda', 
		image: require('./../../images/tienda.png'), color: '#009565' }];

const { width, height } = Dimensions.get('window');

const resetAction = NavigationActions.reset({
	index: 0,
	actions: [
	NavigationActions.navigate({ routeName: 'Home' })
	]
});

const HEIGHT_OFFSET = Platform.OS === 'ios' ? (height === 812 ? 89 : 64) : 56;


class IncidentReport extends Component {
	
	static navigationOptions = {
		header: null
	};
	
	constructor(props) {
		super(props);
		this.state = {
			data: incidents
		};
	}
	
	_renderItem(item) {
		return (
			<View style={{width: '50%', flexDirection: 'column', marginBottom: 20}}>
				<Button 
				style={[styles.button, {backgroundColor: item.color}]} rounded
				onPress={() => {
					this.props.navigation.navigate('IncidentLocation', {
					incident: item
					});
				}}
				>	
					<AsyncImage
					style={styles.image}
					source={item.image}
					placeholderColor={'rgba(0,0,0,0)'}
					/>
				</Button>
				<Text style={styles.buttonIconText}>{item.name}</Text>
			</View>
		);
	}


	render() {
		return (
		<Container>
			<ImageBackground
			resizeMode='cover'
			style={{ flex: 1, position: 'relative', backgroundColor: 'rgba(0,0,0,0.4)', width: width, height: height }}
			blurRadius={10}
			source={require('./../../images/mapwaze.jpg')}
			>
				<FlatList
				contentContainerStyle={{justifyContent: 'center'}}
				style={styles.containerList}
				data={this.state.data}
				numColumns={2}
				columnWrapperStyle={{ padding: 10 }}
				renderItem={({ item }) => this._renderItem(item)}
				/>
				<Button full 
					style={styles.buttonContainer}
					onPress={() => this.props.navigation.dispatch(resetAction)}
					>
					<Text style={styles.buttonText}>CERRAR</Text>
				</Button>
			</ImageBackground>
		</Container>
		);
	}
}

const BUTTON_HEIGHT = 64;

const styles = StyleSheet.create({
	buttonContainer: {
		width: width,
		height: BUTTON_HEIGHT,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	buttonText: {
		textAlign: 'center',
		fontSize: 20,
		color: 'white',
		fontWeight: 'bold',
	},
	containerList: {
		backgroundColor: 'rgba(0,0,0,0.4)',
		width: width,
		height: height - BUTTON_HEIGHT,
		paddingTop: HEIGHT_OFFSET
	},
	
	button: {
		marginHorizontal: 'auto',
		height: 100,
		width: 100,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		borderWidth: 4,
		borderColor: 'white',
		shadowOffset: { width: 4, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 0.75,
    shadowRadius: 10
	},
	buttonIconText: {
		width: '100%',
		flex: 1,
		textAlign: 'center',
		paddingTop: 4,
		color: 'white',
		fontSize: 14
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
		position: 'relative'
	},
	canvas: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	image: {
		width: 60,
		height: 60,
	},
});

export default IncidentReport;
