import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageZoom from 'react-native-image-pan-zoom';
import { loadMaps } from '../../actions/maps';
import {
	StyleSheet,
	Dimensions,
	Platform,
} from 'react-native';
import {
	Container,  
	Text,
	Button,
	Form,
	View,
	ActionSheet,
	Header,
	Left,
	Body,
	Right,
	Icon,
	Title,
	Textarea,
	Toast
} from 'native-base';
import { loadIncidents, insertIncidents } from '../../actions/storeIncidents';
import {
  CachedImage,
  ImageCacheProvider
} from 'react-native-cached-image';

import DrawSvgPanResponder from "./DrawSvgPanResponder"
import Modal from "react-native-modal";
import AsyncImage from './../extras/AsyncImage';
import {WS_ROOT_WAZE} from './../../constants/config';

const io = require('socket.io-client');

//const BUTTONS = ['Nivel 1', 'Nivel 2', 'Cancel'];
//const CANCEL_INDEX = 2;
const { width, height } = Dimensions.get('window')

const HEIGHT_OFFSET = Platform.OS === 'ios' ? (height === 812 ? 89 : 64) : 56;
const STORE_TYPE = 0;
const MY_LOCATION_TYPE = 1;

class IncidentLocation extends Component {
	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			detail: '',
			selectedLocation_id: '',
			mall_id: 0,
			levels: [],
			buttons: [],
			loading_map: true,
			show_location: false,
			current_level: 1,
			store_location_level: '',
			my_location_level: '',
			my_location: null,
			my_location_mall_element_id: '',
			request_type: STORE_TYPE,
			limit_points: '',
			selected_level_id: '',
			route_path: '',
			show_route_path: false,
			connected: false,
			coords: null,
			connected: false,
		};
		
	}

	componentWillUnmount(){
		this.socket.close();
	}

	componentWillMount() {
		ActionSheet.actionsheetInstance = null;
		this.props.dispatch(loadIncidents());
		this.props.dispatch(loadMaps());
		

		this.socket = io(WS_ROOT_WAZE);
		this.socket.on('connect', ()=>{
			this.setState({connected: true});
		})
	}

	componentWillReceiveProps(nextProps) {
		const { maps } = nextProps.maps;

	    var buttons_list=[];
	    if(maps.length){
	      for (var i = 0; i < maps.length; i++) {
	        buttons_list.push('Nivel ' + (i+1).toString());
	      }  
	    }
	    buttons_list.push("Cancel");

	    this.setState({
	      buttons: buttons_list,
	      cancel_index: maps.length 
	    });

		const { route } = nextProps.route;
		let selected_level = this.state.current_level;
		let current_level = this.state.current_level;

		if (route.path) {
			this.setState({route_path: route.path });
		}

		if (maps.length) {
			this.setState({
			levels: maps,
			mall_id: maps[0].map_id,
			current_level: selected_level
			});
		}
	}    

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	asignDetail(text) {
		this.setState({ detail: text });
	}

	emitIncident(incident){
		this.socket.emit('incidents', incident);
	}

	saveData() {
		const selected_level = this.state.levels.find(
			element => element.level === this.state.current_level
		);
		const incidentsInfo = {
			type: this.props.navigation.state.params.incident.type,
			information: this.state.detail,
			mall_level_id: selected_level.id,
			map_id: selected_level.map_id,
			location: this.state.my_location,
		};
		this.props.dispatch(insertIncidents(incidentsInfo, (incident)=>{this.emitIncident(incident)}))
		.then((success) => {
			if (success) {
				this.props.navigation.goBack();
				Toast.show({
					text: 'Mensaje Enviado'
				})
			}
		});
	}

	showRoute = () => {
		return (this.state.route_path && !this.state.loading_map && this.state.show_route_path);
	};
	currentLevelRoutePath = () => {
		const route = this.state.route_path;
		const current_route = route ? route.filter(element => element.level == this.state.current_level) : [];
		
		return current_route;
	};
	showMyLocation = () => {
		return (this.state.my_location && !this.state.loading_map);
	};


	updateMyLocation(point){
		const selected_level = this.state.levels.find(
			element => element.level === this.state.current_level
		);
		const IMG_HEIGHT = height;
		const IMG_WIDTH = height * selected_level.image_width / selected_level.image_height;
		point.x = point.x / IMG_WIDTH;
		point.y = point.y / IMG_HEIGHT;
		this.setState({
			my_location: point
		});
	}

	renderMap(selected_level) {
		
		const IMG_HEIGHT = height;
		const IMG_WIDTH = height * selected_level.image_width / selected_level.image_height;
		
		return (
			<View style={{ flex: 1 }}>
			<View 
				style={{ flex: 1 }}
				>
				<ImageZoom
					cropWidth={width}
					cropHeight={height - HEIGHT_OFFSET}
					imageWidth={IMG_WIDTH}
					imageHeight={IMG_HEIGHT}
					centerOn={{ x: 0, y: 0, scale: 1.00001 }}
					enableSwipeDown={true}
					swipeDownThreshold={-1}
					style={{ backgroundColor: 'white' }}
					>
						<View
							style={{
								width: IMG_WIDTH,
								height: IMG_HEIGHT,
								position: 'relative',
								backgroundColor: 'white'
							}}
							>	
							<ImageCacheProvider style={{
                  width: IMG_WIDTH,
                  height: IMG_HEIGHT,
                  position: 'absolute',
                }} urlsToPreload={[selected_level.image]}>
              	<CachedImage source={{uri: selected_level.image}} 
									resizeMode="contain"
									onLoadStart={(e) => this.setState({loading_map: true})}
									onLoadEnd={(e) => this.setState({loading_map: false})}
									style={{
										width: IMG_WIDTH,
										height: IMG_HEIGHT,
										position: 'absolute',
									}}
									/>
              </ImageCacheProvider>
							<DrawSvgPanResponder
                width={IMG_WIDTH}
                height={IMG_HEIGHT}
								myPosition={this.state.my_location}
                drawMyPosition={this.showMyLocation()}
								style={{ position: 'absolute', top: 0, left: 0 }}
								onClick={(point)=>{
									this.updateMyLocation(point);
								}}
              />
						</View>
				</ImageZoom>
			</View>

				<Button
				style={{ backgroundColor: '#3C7A60', borderRadius: 0, height:  64}}
				onPress={() =>
				ActionSheet.show(
					{
					options: this.state.buttons,
					cancelButtonIndex: this.state.cancel_index,
					title: 'Seleccione un nivel'
					},
					buttonIndex => {
					if (buttonIndex != this.state.cancel_index && buttonIndex != (this.state.current_level - 1)) {
						this.setState({
						current_level: buttonIndex + 1,
						show_location: false,
						loading_map: true
						});
					}
					}
				)
				}
				>
				<View style={styles.levelButtonView}>
				<Text style={styles.levelButtonNumber}> {this.state.current_level} </Text>
				<Text style={styles.levelButtonText}> Nivel </Text>
				</View>
				</Button>

			</View>		
		);	
	}

	render() {
		const { navigation } = this.props;
    	const itemId = navigation.getParam('itemId', 'NO-ID');
		const selected_level = this.state.levels.find(
			element => element.level === this.state.current_level
		);

		return (		
				<Container>
					<Header>
						<Left>
							<Button transparent onPress={() => this.props.navigation.goBack()}>
								<Icon type="FontAwesome" name="angle-left" />
							</Button>
						</Left>
						<Body>
							<Title>Ubicación</Title>
						</Body>
						<Right>
							<Button transparent onPress={() => {
									if(this.state.my_location){
										this.setModalVisible(true);
									} else {
										Toast.show({
											text: 'Indicanos tu posición.'
										});	
									}
								}}>
								<Text>Aceptar</Text>
							</Button>
						</Right>
					</Header>
					<Modal 
						isVisible={this.state.modalVisible} 
						style={styles.modal}
						onBackdropPress={() => this.setState({ modalVisible: false })}
						onBackButtonPress={() => this.setState({ modalVisible: false })}
						onSwipe={() => this.setState({ modalVisible: false })}
          	swipeDirection="down"
						avoidKeyboard={true}
						>
						<View style={styles.modalBody}>
							<Form style={styles.modalForm}>
								<View style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
									<View style={[styles.modalIcon, {backgroundColor: navigation.state.params.incident.color}]}>
										<AsyncImage 
											style={styles.modalIconImage} 
											source={navigation.state.	params.incident.image}
											placeholderColor={'rgba(0,0,0,0)'}
											/>
									</View>
									<Text style={styles.modalTitle}>Detalles del Incidente</Text>
								</View>
								<Textarea 
									style={{fontSize: 18}	}
									onChangeText={(text) => { this.asignDetail(text); }} 
									rowSpan={7}
									placeholder="Escribe aquí..." />		
							</Form>
							<View style={styles.buttonsModalContainer}>
								<Button 
									style={[styles.modalButton, {backgroundColor: '#688293'}]}
									onPress={() => {
										this.setModalVisible(!this.state.modalVisible);
									}}
									>
									<Text style={styles.buttonText}>VOLVER</Text>
								</Button>
								<Button
									style={[styles.modalButton, {backgroundColor: '#1967B0'}]}
									onPress={() => {
										this.setModalVisible(!this.state.modalVisible);
										this.saveData();
									}}
									>
									<Text style={styles.buttonText}>REGISTRAR</Text>
								</Button>
							</View>
						</View>
					</Modal>				
					<Container>
						{this.state.levels.length ? this.renderMap(selected_level) : null}
					</Container>
				</Container>
		);	
	}
	

}

const styles = StyleSheet.create({
	button: {
		marginRight: 3,
		marginLeft: 3
	},
	modal: {
		flex: 1,
		justifyContent: "flex-end",
    margin: 0
	},
	modalBody: {
    margin: 0,
		backgroundColor: "white",
    borderRadius: 8,
		borderColor: "rgba(0, 0, 0, 0.1)",
	},
	modalForm: {
		width: '100%',
		paddingHorizontal: 8,
		paddingVertical: 12
	},
	buttonsModalContainer: {
		width: '100%',
		flexDirection: 'row',
	},
	modalTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginLeft: 4,
	},
	modalIcon: {
		width: 42,
		height: 42,
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: 'white',
		borderWidth: 2,
		borderColor: 'white',
	},
	modalIconImage: {
		width: 22,
		height: 22,
	},
	modalButton: {
		width: '50%',
		borderRadius: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		textAlign: 'center',
		fontSize: 14,
	},
	map: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	levelButtonView: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	levelButtonNumber: {
		fontSize: 32,
		textAlign: 'center',
		color: 'white',
		fontWeight: 'bold',
	},
	levelButtonText: {
		fontSize: 14,
		textAlign: 'center',
		color: 'white',
	},
	MainContainer: {
 
		// Setting up View inside content in Vertically center.
		justifyContent: 'center',
		flex: 1,
		margin: 10		 
	}
});


const incidentStateToProps = state => ({
	maps: state.mapsReducer,
	incidents: state.incidentsReducer, 
	route: state.routesReducer
});

export default connect(incidentStateToProps)(IncidentLocation);