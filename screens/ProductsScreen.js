import React from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList, TouchableHighlight, Image } from 'react-native';
import axios from 'axios';

import WooApi from '../constants/Api';

export default class ProductsScreen extends React.Component {
  static navigationOptions = {
    title: 'Products',
  };

  state = {
    products: []
  }

  fetProducts = () => {
    const url = `${WooApi.url.wc}products?per_page=20&consumer_key=${WooApi.keys.consumerKey}&consumer_secret=${WooApi.keys.consumerSecret}`;
    console.log('url',url)
    axios.get(url)
    .then(response => this.setState({ products: response.data }))
    .catch(error => console.log('error',error));
  }
  
  componentWillMount() {
    this.fetProducts();
  }

  renderItem = ({item}) => (
    <TouchableHighlight 
      style={styles.listItem} 
      onPress={() => this.props.navigation.navigate("SingleProduct", { product: item })}
    >
      <View style={styles.view}>
        <Image style={styles.image} source={{ uri: item.images[0].src }} />
        <Text style={styles.text}>{item.name}</Text>
      </View>
    </TouchableHighlight>
  )

  render() {
    return (
      <ScrollView style={styles.container}>
        {
          this.state.products.length ?
          <FlatList
            contentContainerStyle={styles.list} 
            numColumns={2}
            data={this.state.products}
            keyExtractor={ item => item.id }
            renderItem={this.renderItem}
          />
          :
          <View style={styles.loaderContainer}>
            <Image
              source={ require('../assets/images/cart-loading.gif') }
              style={styles.loaderImage}
            />
          </View>
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f6f6f6',
  },
  list: {
    flexDirection: 'column'
  },
  listItem: {
    width: '50%'
  },
  view: {
    padding: 10
  },
  image: {
    width: 150, 
    height: 150
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    padding: 5
  },
  loaderContainer: {
    alignItems: 'center', 
    justifyContent: 'center',
  },
  loaderImage: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
