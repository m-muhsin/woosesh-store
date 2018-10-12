import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                require('../assets/images/woosesh-logo.jpg')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            <Text style={styles.title}>WooSesh Store</Text>
          </View>
          <ScrollView
            horizontal
            scrollEventThrottle={10}
            pagingEnabled
            style={{ marginBottom: 10 }}
          >
            <Image
              source={{ uri: 'https://woocommerce-store.on-its-way.com/wp-content/uploads/2018/02/sunglasses-768x768.jpg' }} style={styles.sliderImage}
            />
            <Image
              source={{ uri: 'https://woocommerce-store.on-its-way.com/wp-content/uploads/2018/02/cap-768x768.jpg' }} style={styles.sliderImage}
            />
            <Image
              source={{ uri: 'https://woocommerce-store.on-its-way.com/wp-content/uploads/2018/02/polo-768x767.jpg' }} style={styles.sliderImage}
            />
          </ScrollView>
          <Button color="#05a5d1" title="SHOP" onPress={() => this.props.navigation.navigate("Products")} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  title: {
    fontSize: 22,
    paddingBottom: 10
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  helpLink: {
    paddingVertical: 15,
  },
  sliderImage: {
    height: 360,
    width: 360
  }
});
