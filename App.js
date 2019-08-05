import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from './components';
import Weather from './components/Weather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import { Provider } from 'react-redux';
// import configureStore from './store/configureStore';

// const store = configureStore({});

export default class App extends React.Component {
  state = {
    headerTitle: 'Weather at your location',
    date: '',
    userLocate: {},
  };

  componentDidMount() {
    this.getUserLocationAndDate();
  }

  getUserLocationAndDate = () => {
    fetch('https://api.ipdata.co?api-key=1dc33f4b92d30b0d339d5cc30fc51f8a106686a6037c4883ba51318c')
      .then(res => res.json())
      .catch(() => [])
      .then(userLocate => this.setState({ userLocate }));

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

    this.setState({ date: allDateDatas });
  };

  render() {
    const { headerTitle, userLocate, date } = this.state;
    const { lastUpdate, lastUpdateTime, reloadIcon } = styles;

    return (
      // <Provider store={store}>
      <View>
        <Header title={headerTitle} />
        <View style={lastUpdate}>
          <Text style={lastUpdateTime}>Last update: {date}</Text>
          <FontAwesome name="repeat" style={reloadIcon} onPress={this.getUserLocationAndDate} />
        </View>
        {userLocate.city !== undefined && userLocate.country_name !== undefined && (
          <Weather city={userLocate.city} country_name={userLocate.country_name} />
        )}
      </View>
      // </Provider>
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
