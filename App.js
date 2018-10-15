import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { CartContext } from './context/CartContext';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    items: [],
  };
  
  onAddItem = (item) => {
    this.setState(state => {
      var exists = false;
			const newState = state.items.map(currentItem => {
				if (currentItem.id === item.id) {
					exists = true;
					return {
						...currentItem,
						quantity: currentItem.quantity + item.quantity
					}
				} else {
					return currentItem
				}
      });
      if(exists) {
        return {
          items: newState
        }
      } else {
        return {
          items: [
            ...state.items,
            item
          ]
        }
      }
    });
  }

  onRemoveItem = (item) => {
    this.setState(state => {
      const remainingItems = [
        ...state.items.filter(i => i.id !== item.id)
      ]
      return {
        items: remainingItems
      }
    });
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <CartContext.Provider
          value={{
            items: this.state.items,
            addItem: this.onAddItem,
            removeItem: this.onRemoveItem,
          }}
        >
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </CartContext.Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/woosesh-logo.png'),
      ]),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
