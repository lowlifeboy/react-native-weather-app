import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from './components';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import Location from './components/Location';

const store = configureStore({});

export default class App extends React.Component {
  state = {
    headerTitle: 'Weather at your location',
  };

  render() {
    const { headerTitle } = this.state;

    return (
      <Provider store={store}>
        <View>
          <Header title={headerTitle} />
          <Location />
        </View>
      </Provider>
    );
  }
}
