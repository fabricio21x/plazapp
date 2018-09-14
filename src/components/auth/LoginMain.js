import React, { Component } from 'react';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

import LoginScreen from './LoginScreen';

export default class LoginMain extends Component {

	constructor(props) {
			super(props);
			//this.state = { count: 0 };
			this.state = { pressStatus: false };
	}
	onPressButton = () => {
			this.setState({ pressStatus: true });
			//this.setState({ count: this.state.count + 1 });
	}
	
	render() {
		return (
			<LoginScreen
			navigation={this.props.navigation}
			/>
	  );
	}
}
