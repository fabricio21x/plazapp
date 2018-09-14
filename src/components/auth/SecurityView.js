import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Alert
} from 'react-native';
import {
	Item,
	Icon
} from 'native-base';
export default class SecurityView extends Component {

	constructor(props) {
			super(props);
	}

	
	render() {
		const { navigate } = this.props.navigation;
		return (
			<View>
				<Item
				onPress={() => navigate('PasswordChange')}
				>
					<View
					style={styles.card}
					>
						<Icon 
						active 
						name='unlock'
						/>
						<Text
						style={styles.text}
						>
						Cambiar contraseña
						</Text>
					</View>
				</Item>
			</View>
		);
	}
}

const styles = StyleSheet.create({
		card: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ddd',
        position: 'relative',
        height: 70,
    	},
    	text: {
    	color: 'grey',
    	fontSize: 22,
    }
});
