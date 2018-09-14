import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { 
  loadRecommendedCategories 
} from '../../actions/recommendedCategories';
import {
  loadProfile
} from '../../actions/profile';
import ProductList from './ProductList';
import { getUserToken } from '../../utils/storage';      
import Loader from '../parking/Loader';
class HomeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingState: 'initial',
      isFinishedLoading: false,
      prefCategories: [],
      favProdIds: [],
      heartPressed: false,
      userId: -1,
    };
  }

  loadFavorites() {
    var request = new XMLHttpRequest();
    var changeState = this.setState.bind(this);
    request.open('GET', 'http://200.16.7.150:8083/api/v1/products/favorites');
    getUserToken().then((token) => {          
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
                  newArr = requestResponse.products.map(prod => prod.id);
                  changeState({
                    favProdIds: newArr,
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


  saveFavorites(item, op) {
      var request = new XMLHttpRequest();
      var post_url = ' ';
      if (op == 'like') {
        post_url = 'http://200.16.7.150:8083/api/v1/products/like';
      } else {
        post_url = 'http://200.16.7.150:8083/api/v1/products/dislike';
      }
      request.open('POST', post_url);
      var userToken = '';
      getUserToken().then((token) => {
          userToken = token;
          request.setRequestHeader('Authorization', userToken);
          request.setRequestHeader('Content-Type', 'application/json');
          request.setRequestHeader('Accept', 'application/json');

          request.onreadystatechange = function () {
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
    var op = ' ';
    var newArr = this.state.favProdIds.slice(); // obtainning new clone of list
    if (this.state.favProdIds.includes(itemId)){
      op = 'dislike';
      newArr = newArr.filter(item => item !== itemId)
    } else {
      op = 'like';
      newArr.push(itemId);
    }
    this.saveFavorites(item, op);
    this.setState({
        heartPressed: this.state.heartPressed ? false : true,
        favProdIds: newArr,
      });
  }

  uniqueCategories(nextProps) {
    var categories = nextProps.prefCategories.prefCategories;
    console.log(categories);
    var returnable_ids = [];
    var returnable = [];
    for (var i = 0; i < categories.length; i++) {
      var item = categories[i];
      if (!returnable_ids.includes(item.id)) {
        returnable_ids.push(item.id);
        returnable.push(item);
      }
    }
    console.log(returnable);
    return returnable;
  }

  componentWillMount() {
    this.props.dispatch(loadProfile());
    this.loadFavorites();
  }


  componentWillReceiveProps(nextProps) {
    console.log("inside componentWillReceiveProps");
    console.log(nextProps);
    if (this.state.loadingState == 'initial') {
      //we will check for profile info
      if (!(nextProps.profile.isFetching === false && 
        nextProps.profile.error === false)) {
        return;
      }
      // we got the profile, now we set the state and the userId
      var _this = this;
      this.setState({
        userId: nextProps.profile.profile.user.id,
        loadingState: 'loadedProfile',
      }, () => {
        _this.props.dispatch(loadRecommendedCategories(_this.state.userId));    
      });
      return;
    }

    if (this.state.loadingState == 'loadedProfile') {
      console.log(this.state.loadingState);
      console.log(nextProps);
      try{
        if (!(nextProps.prefCategories.isFetching === false && 
        nextProps.prefCategories.error === false)) {
        return;
      }  
      } catch(err) {
        return;
      }
      
      var categories = [];
      try {
        categories = [...this.uniqueCategories(nextProps)];  
      } catch (err) {
        return;
      }
      
      this.setState({
        loadingState: 'finished',
        isFinishedLoading: true,
        prefCategories: categories
      }, () => {
        if (this.state.prefCategories.length > 0) {
          console.log(this.state.prefCategories);
        }
      });
      return;
    }
    return;
  }

  isComponentInfoLoaded() {
    if (this.state.isFinishedLoading === false) {
      return (
        <Loader />
        );
    }
    console.log(this.state.prefCategories);
    return (
      <FlatList
        renderItem={({ item }) => 
        <ProductList 
        navigation={this.props.navigation} 
        category={item} 
        favorites={this.state.favProdIds}
        onPressHearts={this.onPressHearts.bind(this)} 
        screen='Home'
        />}
        data={this.state.prefCategories}
        extraData={this.state.heartPressed}
      />);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
      {this.isComponentInfoLoaded()}
      </View>
      );
  }
}

const mapStateToProps = state => {
  return { prefCategories: state.recommendedCategoriesReducer,
           profile: state.profileReducer };
};

export default connect(mapStateToProps)(HomeList);
