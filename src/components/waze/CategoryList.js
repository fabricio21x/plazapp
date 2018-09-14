import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    TextInput,
    Dimensions,
    FlatList,
    ScrollView
} from 'react-native';
import {
	Container, 
	Header, 
	Content, 
	CheckBox,
	List, 
	ListItem, 
	Left, 
	Body, 
	Right, 
	Thumbnail, 
	Text,
	Button,
	Icon
} from 'native-base';
import { StackNavigator } from 'react-navigation';
import {connect} from 'react-redux'
import {getAllCategories} from './../../api/api';
import {loadCategories} from '../../actions/storeCategories';

const {width, height} = Dimensions.get('window');

class CategoryList extends Component {
	componentWillMount(){
        this.props.dispatch(loadCategories());
    }
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			data: '',
			//selectedCategories: []
			selectedCategories: this.props.navigation.state.params ? this.props.navigation.state.params.lastSelection : []
		};
	};
	static navigationOptions = {
		header: null
	};
    componentWillReceiveProps(nextProps) {
        const {categories} = nextProps.categories;

        if (categories.store_categories)
            this.setState({data: categories.store_categories});
    };
	checkBoxHandler(id){
		const index_id= this.state.selectedCategories.indexOf(id);
		if(index_id==-1){
			this.setState({
				selectedCategories: this.state.selectedCategories.concat(id)
			});		
		}
		else{
			var restingSelection = this.state.selectedCategories;
			restingSelection.splice(index_id,1);

			this.setState({
				selectedCategories: restingSelection
			});			
		}
	}
	goBack() {
	    const { navigation } = this.props;
	    navigation.state.params.onSelect(this.state.selectedCategories);
	    navigation.goBack();
	}
	renderList(categories) {
		//this.chargeData(stores);
		return (
			<Container>
				<Header>
					<Left style={styles.headerItem}>
			            <Button transparent onPress={() => this.goBack()}>
			                <Icon type="FontAwesome" name='angle-left' />
			            </Button>
			        </Left>
					<Body>
					</Body>
					<Right>
					</Right>
				</Header>
				<FlatList
					data={this.state.data? this.state.data : categories.store_categories}
					keyExtractor={(item,index) => item.id}
					extraData={this.state}
					renderItem={({ item }) => {
		                return <ListItem icon onPress={() => this.checkBoxHandler(item.id)}>
							<Left>
								<Icon name={item.logo} />
							</Left>
							<Body>
								<Text style={{color: 'black'}}>{item.name}</Text>
							</Body>
							<Right>
								<CheckBox
			                    checked={this.state.selectedCategories.includes(item.id) ? true : false}
			                    onPress={() => this.checkBoxHandler(item.id)}
			                  />
							</Right>
						</ListItem>
					}}
				/>
			</Container>
		);
	};
    render() {
        const {categories} = this.props.categories;
        return (
            <Container>
            	{categories.store_categories ? this.renderList(categories) : null}
            </Container>
        );
    };
};

const styles = StyleSheet.create({
	input: {
		height: 35,
		backgroundColor: '#e5e7f2',
		width: width / 2,
		marginHorizontal: 10,
		paddingLeft: 30,
		borderRadius: 3
	},
	backButtonText: {
		color: 'white',
		fontSize: 15
	}
});

const mapStateToProps = state => {
    return { categories: state.categoriesReducer }
};


export default connect(mapStateToProps)(CategoryList);