import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container } from 'native-base';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { loadBanners } from '../../actions/banners';

const { width, height } = Dimensions.get('window');

const TagsLeader = props => (
  <View style={myStyles.background}>
    <Image style={myStyles.image} source={{ uri: props.link }} />
  </View>
);

class Slide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFinishedLoading: false,
      banners: [],
    };
  }

  componentWillMount() {
    this.props.dispatch(loadBanners());
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.banners);
    if (!(nextProps.banners.isFetching === false 
      && nextProps.banners.error === false)) {
      return;
    }

    this.setState({
      isFinishedLoading: true,
      banners: nextProps.banners.banners.banners
    });
  }


  loadingView() {
    // if still loading
    
    if (this.state.isFinishedLoading === false) {
      return (
        <Container height={150} />
        );
    }

    // if already loaded
    let myArray = [];
    console.log(this.state.banners);
    const banners = this.state.banners;
    for (let i = 0; i < banners.length; i++) {
      myArray.push(banners[i].banner);
    }
    console.log(myArray[0]);

    return (
        <Swiper autoplay height={150} autoplayTimeout={10}>
          {myArray.map((item, i) => (
            <TagsLeader link={item} key={i}/>
           // <TagsLeader link={item} key={i} onPress={() => this.props.navigation.navigate('EventDetail', { item: myItem })} />
          ))}
        </Swiper>
    );
  }

  render() {
    return (
    <View style={{ flex: 1 }}>
    {this.loadingView()}
    </View>);
  }
}

const myStyles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent:
      'space-between' /* Reparte de manera homogénea cada elemento en todo el espacio definido */
  },
  image: {
    flex: 1,
    width,
    resizeMode: 'contain'
  }
});

const mapStateToProps = state => {
  return { banners: state.bannersReducer };
};

export default connect(mapStateToProps)(Slide);
