import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Header } from './components'; //, ImageCard, Layout, Details

// class HomeScreen extends React.Component {

// }

export default class App extends React.Component {
  state = {
    headerTitle: 'Weather at your location',
    userLocate: [],
  };

  componentDidMount() {
    fetch('http://api.sypexgeo.net/')
      .then(res => res.json())
      .catch(() => [])
      .then(userLocate => this.setState({ userLocate }));
  }

  render() {
    const { headerTitle } = this.state;
    const { userLocate } = this.state;

    const { ip } = userLocate;
    const { city } = userLocate;
    const { region } = userLocate;

    // const { container } = styles;
    // const { navigation } = this.props

    return (
      <View>
        <Header title={headerTitle} />
        <ScrollView>
          <Text>{ip}</Text>
          <Text>{city}</Text>
          {/* <Text>{region.name_ru}</Text> */}
        </ScrollView>
      </View>
    );
  }
}
