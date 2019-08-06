import React from 'react';
import { AsyncStorage, View, Text, StyleSheet } from 'react-native';
import { Header } from './components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import Location from './components/Location';

const store = configureStore({});

export default class App extends React.Component {
  state = {
    headerTitle: 'Weather at your location',
    date: '',
  };

  componentDidMount() {
    AsyncStorage.getItem('date')
      ? AsyncStorage.getItem('date')
          .then(value => {
            this.setState({ date: JSON.parse(value) });
          })
          .done()
      : this.getDate();
  }

  getDate = () => {
    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const hours = new Date().getHours(); //Current Hours
    const min = new Date().getMinutes(); //Current Minutes
    const sec = new Date().getSeconds(); //Current Seconds

    const allDateDatas =
      (date < 10 ? '0' + date : date) +
      '.' +
      (month < 10 ? '0' + month : month) +
      '.' +
      year +
      ' ' +
      (hours < 10 ? '0' + hours : hours) +
      ':' +
      (min < 10 ? '0' + min : min) +
      ':' +
      (sec < 10 ? '0' + sec : sec);

    AsyncStorage.setItem('date', JSON.stringify(allDateDatas))
      .then(() => {
        this.setState({ date: allDateDatas });
      })
      .done();
  };

  render() {
    const { headerTitle, date } = this.state;
    const { lastUpdate, lastUpdateTime, reloadIcon } = styles;

    return (
      <Provider store={store}>
        <View>
          <Header title={headerTitle} />
          <View style={lastUpdate}>
            <Text style={lastUpdateTime}>Last update: {date}</Text>
            <FontAwesome name="repeat" style={reloadIcon} onPress={this.getDate} />
          </View>
          <Location />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  lastUpdate: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 25,
    backgroundColor: '#eee',
  },
  lastUpdateTime: {
    fontSize: 16,
  },
  reloadIcon: {
    fontSize: 25,
    color: '#000',
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
});
