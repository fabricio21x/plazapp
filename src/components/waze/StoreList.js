import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, TextInput, Dimensions } from 'react-native';
import {
  Container,
  Header,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Button,
  Icon,
  Item,
  Input
} from 'native-base';
import { connect } from 'react-redux';
import { loadStores } from '../../actions/stores';

const { width, height } = Dimensions.get('window');

class StoreList extends Component {
  componentWillMount() {
    this.props.dispatch(loadStores());
  };
  state = {
      text: '',
      data: '',
      categoryId: []
  };
  static navigationOptions = {
    header: null
  };
  onSelect = (data) => {
    this.setState({ categoryId: data });
    this.props.dispatch(loadStores(data));
  };
  componentWillReceiveProps(nextProps) {
    const { stores } = nextProps.stores;
    if (stores.length) this.setState({ data: stores });
  };
  filter(text) {
    const { stores } = this.props.stores;
    const newData = stores.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
      text
    });
  };
  deleteData() {
    this.setState({ text: '', data: '' });
  };
  selectStore(store) {
    const { navigation } = this.props;
    navigation.state.params.selectStore(store.id, navigation.state.params.type, store.mall_level.id, store.mall_level.level);
    navigation.goBack();
  };
  _renderItem(item) {
    return (
      <ListItem
        button
        onPress={() => { this.selectStore(item) }}
      >
        <Left>
          <Thumbnail source={{ uri: item.logo }} />
        </Left>
        <Body>
          <Text style={{ color: 'black' }}>{item.name}</Text>
        </Body>
        <Right>
          <Text style={{ color: '#b7acac', fontSize: 10 }}>Nivel {item.mall_level.level}</Text>
        </Right>
      </ListItem>
    );
  };
  render() {
    const { stores } = this.props.stores;
    return (
      <Container>
        <Header searchBar rounded>
          <Left style={styles.headerItem}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon type="FontAwesome" name='angle-left' />
            </Button>
          </Left>
          <Item style={styles.headerSearch}>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={text => this.filter(text)}/>
          </Item>
          <Right style={styles.headerItem}>
            <Button transparent onPress={() => this.props.navigation.navigate('CategoryList', { lastSelection: this.state.categoryId, onSelect: this.onSelect })}>
              <Icon name="options" />
            </Button>
          </Right>
        </Header>
        <Container>
        {stores.length ?
          <List dataArray={this.state.data} renderRow={item => this._renderItem(item)} />
        : null}
        </Container>
      </Container>
      )
  }
}

const styles = StyleSheet.create({
  headerItem: {
    flex: 20,
  },
  headerSearch: {
    flex: 60,
  }
});

const mapStateToProps = state => ({ stores: state.storesReducer});

export default connect(mapStateToProps)(StoreList);
