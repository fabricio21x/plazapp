import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Alert
} from 'react-native';
import {
	Button,
	Icon,
	Toast
} from 'native-base';
import Camera from 'react-native-camera';
import { getUserToken } from '../../utils/storage';

const PicturePath = '';

export default class CameraView extends Component {
	constructor(props) {
		super(props);
		 this.state = {
		      cameraType: 'front',
		      mirrorMode: false
		};
	}
	changeCameraType() {
	    if (this.state.cameraType === 'back') {
	      this.setState({
	        cameraType: 'front',
	        mirrorMode: true
	      });
	    } else {
	      this.setState({
	        cameraType: 'back',
	        mirrorMode: false
	      });
	    }
	}

	sendPicture(imgPath) {
		const request = new XMLHttpRequest();
		const _this = this;

        request.open('PUT', 'http://200.16.7.150:8083/api/v1/users/profile');
        let userToken = '';
            getUserToken().then((token) => {
                userToken = token;
                request.setRequestHeader('Authorization', userToken);
                request.setRequestHeader('Content-Type', 'application/json');
                request.setRequestHeader('Accept', 'application/json');

                request.onreadystatechange = function () {
                    if (this.readyState === 4) {
                    	console.log('Status:', this.status);
                        console.log('Headers:', this.getAllResponseHeaders());
												console.log('Body:', this.responseText);
												
                        if ('user' in JSON.parse(this.responseText)) {
													var respond=JSON.parse(this.responseText);
													Alert.alert('Selfie', 'Tu rostro ha sido reconocido exitosamente!');
													var message='Has ganado puntos: '+ 50;
													Toast.show({
														text: message,
														duration: 2500
													})
													
	      					_this.props.navigation.goBack();
                        } else {
                        	Alert.alert('Selfie', 'Inténtalo nuevamente!');
	      					_this.props.navigation.replace('CameraView');	
                        }
                    }
                };
    //             var photo = {
				//     uri: imgPath,
				//     type: 'image/jpeg',
				//     name: imgPath.split('/').slice(-1)[0],
				// };

				const RNFS = require('react-native-fs');
				RNFS.readFile(imgPath.replace('file:', ''), 'base64').then((imgFile) => {
					const body = {};
	                const sub_body = {};	                
	                const sub_sub_body = {};
	                console.log(imgFile);
	                sub_sub_body.content_type = 'image/jpg';
	                sub_sub_body.filename = imgPath.split('/').slice(-1)[0];
	                sub_sub_body.data = imgFile;
	                sub_body.avatar_image = sub_sub_body;
	                body.user = sub_body;
	                request.send(JSON.stringify(body));
				});
            });
	}	


	takePicture() {
    const options = { quality: 0.1 };
    const _this = this;
    this.camera.capture({ metadata: options }).then((data) => {
	      console.log(data);
	      //Alert.alert(data.path);
	      const picturePath = data.path;
	      _this.sendPicture(picturePath);
	    }).catch((error) => {
	      console.log(error);
	      return;
	    });
	}

	render() {
		return (
			<View style={styles.container}>
				<Camera
				ref={(cam) => {
					this.camera = cam;
				}}
				style={styles.view}
				aspect={Camera.constants.Aspect.fill}
				captureTarget={Camera.constants.CaptureTarget.disk}
	            type={this.state.cameraType}
	            mirrorImage={this.state.mirrorMode}
				>
					<View
					style={styles.headerStyle}
					>
						<Text
						style={styles.headerText}
						>
						Enfoca tu rostro y tómate un selfie!
						</Text>
					</View>
					<View style={styles.buttons}>
						<Button
						rounded 
		          		primary
		          		style={styles.capture}
		          		onPress={this.takePicture.bind(this)} 
						>
							<Icon active name='camera' />
						</Button>
						<Button
						rounded 
		          		primary
		          		style={styles.changeCamera}
		          		onPress={this.changeCameraType.bind(this)}
						>
							<Icon active name='reverse-camera' />
						</Button>
					</View> 
				</Camera>
			</View>
			);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',    
  },
  view: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 1,
    backgroundColor: '#1abc9c',
    borderRadius: 5,
    color: 'white',
    fontSize: 16,
    padding: 5,
    margin: 5,
    bottom: 1
  },
  changeCamera: {
    flex: 1,
    backgroundColor: '#757575',
    borderRadius: 5,
    color: 'white',
    fontSize: 16,
    padding: 5,
    margin: 5,
    bottom: 1
  },
  buttons: {
  	flex: 1,
  	flexDirection: 'row',
  	justifyContent: 'center',
  	alignItems: 'flex-end',
  },
  headerStyle: {
  	alignSelf: 'stretch',
  },
  headerText: {
  	backgroundColor: 'rgba(117,117,117,0.3)',	
  	fontSize: 30, 
  	color: 'white', 
  	textAlign: 'center',
  	height: 70,
  	textAlignVertical: 'center',
  }
});
