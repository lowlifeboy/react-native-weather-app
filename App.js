import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Header } from './components';
import Weather from './components/Weather';

export default class App extends React.Component {
  state = {
    headerTitle: 'Weather at your location',
    userLocate: {},
  };

  componentDidMount() {
    fetch('https://api.ipdata.co?api-key=1dc33f4b92d30b0d339d5cc30fc51f8a106686a6037c4883ba51318c')
      .then(res => res.json())
      .catch(() => [])
      .then(userLocate => this.setState({ userLocate }));
  }

  render() {
    const { headerTitle } = this.state;
    const { userLocate } = this.state;

    console.log(userLocate.city, userLocate.country_name);

    return (
      <View>
        <Header title={headerTitle} />
        <Weather city={userLocate.city} country_name={userLocate.country_name} />
      </View>
    );
  }
}
