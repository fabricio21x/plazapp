import React, { Component } from "react";
import { connect } from "react-redux";
import { View, FlatList } from "react-native";
import { loadCategories } from "../../actions/storeCategories";
import { getUserToken } from "../../utils/storage";
import ProductList from "./ProductList";
import Loader from "../parking/Loader";

class CategoriesList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFinishedLoading: false,
			categories: [],
			favProdIds: [],
			heartPressed: false
		};
	}

	loadFavorites() {
		var request = new XMLHttpRequest();
		var changeState = this.setState.bind(this);
		request.open(
			"GET",
			"http://200.16.7.150:8083/api/v1/products/favorites"
		);
		getUserToken().then(token => {
			request.setRequestHeader("Authorization", token);
			request.setRequestHeader("Content-Type", "application/json");
			request.setRequestHeader("Accept", "application/json");

			request.onreadystatechange = function() {
				if (this.readyState === 4) {
					var requestResponse = JSON.parse(this.responseText);
					if ("error" in requestResponse) {
						Alert.alert(this.responseText);
					} else {
						try {
							var newArr = [];
							newArr = requestResponse.products.map(
								prod => prod.id
							);
							changeState(
								{
									favProdIds: newArr
								},
								() => {
									return;
								}
							);
						} catch (err) {
							return;
						}
					}
				}
			};
			request.send();
		});
	}

	saveFavorites(item, op) {
		var request = new XMLHttpRequest();
		var post_url = " ";
		if (op == "like") {
			post_url = "http://200.16.7.150:8083/api/v1/products/like";
		} else {
			post_url = "http://200.16.7.150:8083/api/v1/products/dislike";
		}
		request.open("POST", post_url);
		var userToken = "";
		getUserToken().then(token => {
			userToken = token;
			request.setRequestHeader("Authorization", userToken);
			request.setRequestHeader("Content-Type", "application/json");
			request.setRequestHeader("Accept", "application/json");

			request.onreadystatechange = function() {
				if (this.readyState === 4) {
				}
			};

			var body = {};
			var sub_body = {};
			sub_body["product_id"] = parseInt(item.item.id);
			body["favorite_product"] = sub_body;
			request.send(JSON.stringify(body));
		});
	}

	onPressHearts(item) {
		const itemId = item.item.id;
		var op = " ";
		var newArr = this.state.favProdIds.slice(); // obtainning new clone of list
		if (this.state.favProdIds.includes(itemId)) {
			op = "dislike";
			newArr = newArr.filter(item => item !== itemId);
		} else {
			op = "like";
			newArr.push(itemId);
		}
		this.saveFavorites(item, op);
		this.setState({
			heartPressed: this.state.heartPressed ? false : true,
			favProdIds: newArr
		});
	}

	componentWillMount() {
		this.props.dispatch(loadCategories());
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps.categories);
		if (
			!(
				nextProps.categories.isFetching === false &&
				nextProps.categories.error === false
			)
		) {
			return;
		}
		var categories = [];
		try {
			categories = [
				...nextProps.categories.categories["store_categories"]
			];
		} catch (err) {
			return;
		}

		this.setState(
			{
				isFinishedLoading: true,
				categories: categories
			},
			() => {
				if (this.state.categories.length > 0) {
					console.log(this.state.categories);
				}
			}
		);
	}

	isComponentInfoLoaded() {
		if (this.state.isFinishedLoading === false) {
			return <Loader />;
		}
		console.log(this.state.categories);
		return (
			<FlatList
				renderItem={({ item }) => (
					<ProductList
						navigation={this.props.navigation}
						category={item}
						favorites={this.state.favProdIds}
						onPressHearts={this.onPressHearts.bind(this)}
						screen="CategoriesView"
					/>
				)}
				data={this.state.categories}
				extraData={this.state.heartPressed}
			/>
		);
	}

	render() {
		return <View style={{ flex: 1 }}>{this.isComponentInfoLoaded()}</View>;
	}
}

const mapStateToProps = state => {
	return { categories: state.categoriesReducer };
};

export default connect(mapStateToProps)(CategoriesList);
