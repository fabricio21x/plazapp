import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { loadProductsByStoreStoreCategories } from '../../actions/products';
import ProductSection from './ProductSection';
import BlobSection from './BlobSection';

class ProductList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFinishedLoading: false,
			productsInfo: [],
			counter: 0
		};
	}

	componentWillMount() {
		this.props.dispatch(loadProductsByStoreStoreCategories(this.props.category.id));
	}

	componentWillReceiveProps(nextProps) {
	    if (!(nextProps.products.isFetching === false && 
	      nextProps.products.error === false)) {
	      return;
	    }
	    if (!(nextProps.products.products.idStoreCategory === this.props.category.id)) {
	    	return;
	    }

	    if (Object.keys(nextProps.products.products.products).includes('message')) {
	    	return;
	    }
	    console.log("proceding to set products");
	    console.log("props");
	    console.log(nextProps.products.products.products.products);
	    const products = [...nextProps.products.products.products.products];
	    console.log(products);
	    this.setState({
	      isFinishedLoading: true,
	      productsInfo: products,
	      counter: this.state.counter + 1
	    }, () => {
	      if (this.state.productsInfo.length > 0) {
	      	console.log("new prods state");
	        console.log(this.state);
	        console.log(this.props.category.id);
	        console.log(this.props.category.name);
	      }
	    });
	  }


	isComponentInfoLoaded() {
		console.log("isComponentInfoLoaded");
		console.log(this.props.category.id);
		console.log(this.props.category.name);
		const defaultArr = [1, 2, 3];
	    if (this.state.isFinishedLoading === false) {
	      return (
	        <View>
		    <Text style={myStyles.text}>
		    {this.props.category.name}
		    </Text>
		    <FlatList
		    horizontal
	    	showsHorizontalScrollIndicator={false}
	    	ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
	    	renderItem={({ item }) => 
	    	<BlobSection 
	    	product={item} 	    	
	    	/>}
	    	data={defaultArr}
		    />
		    </View>
	      );
	  	}
	    // // else
	    return (
	    	<View>
		    <Text style={myStyles.text}>
		    {this.props.category.name}
		    </Text>
	    	<FlatList
	    	horizontal
	    	showsHorizontalScrollIndicator={false}
	    	ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
	    	renderItem={({ item }) => 
	    	<ProductSection 
	    	navigation={this.props.navigation} 
	    	product={item} 
	    	favorites={this.props.favorites} 
				onPressHearts={this.props.onPressHearts} 
				screen={this.props.screen}
	    	/>}
	    	data={this.state.productsInfo}
	    	/>
	    	</View>);
    }

	render() {
		return (
			<View>
		    { this.isComponentInfoLoaded() }  
		    </View>
			);
	}
}

const myStyles = StyleSheet.create({
  text: {
    color: '#757575',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  image: {
    width: 120,
    height: undefined,
    flex: 1,
    alignSelf: 'center',
    marginRight: 20
  },
  itemContainer: {
    flex: 1,
    width: 150,
    height: 165,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'gray',
    elevation: 1,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white'
  },
  noFavourite: {
    position: 'absolute',
    right: 1,
    bottom: 1,
    color:'gray'
  },
  favourite:{ 
    color: 'red', 
    position: 'absolute',
    right: 1, 
    bottom: 1
  }

});

const mapStateToProps = state => {
  return { products: state.productsReducer };
};

export default connect(mapStateToProps)(ProductList);
