import React from 'react';
import { StyleSheet, Text, View, Image, RefreshControl } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Weather extends React.Component {
  state = {
    date: '',
    weatherData: {},
  }

  weatherAndDateDatas() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Kharkiv,Ukraine&APPID=d52724e6bdb1b53c4277e62ac1e71740')
      .then(res => res.json())
      .catch(() => [])
      .then(weatherData => this.setState({ weatherData }));

    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const hours = new Date().getHours(); //Current Hours
    const min = new Date().getMinutes(); //Current Minutes
    const sec = new Date().getSeconds(); //Current Seconds

    this.setState({
      date: (
        (date < 10 ? '0' + date : date) + '.' + 
        (month < 10 ? '0' + month : month) + '.' + 
        year + ' ' + 
        (hours < 10 ? '0' + hours : hours) + ':' + 
        (min < 10 ? '0' + min : min) + ':' + 
        (sec < 10 ? '0' + sec : sec)
        ),
    })
  }

  componentDidMount() {
    weatherAndDateDatas()
  }
  
  render() {
    const { city, country_name } = this.props;
    const { date, weatherData } = this.state;
    const { reloadIcon, container, weatherDataBlock, location, weatherImage, weatherDataProperties, lastUpdate } = styles;

    console.log(weatherData);

    return (
      <View>
        <View style={lastUpdate}>
          <Text>Last update: {date}</Text>
          <FontAwesome
            name='repeat' 
            style={reloadIcon}
            // onPress={this.reloadData}
          />
        </View>
        <View style={container}>
          <Text style={location}>{city}, {country_name}</Text>
          {typeof weatherData === 'object' && 
            typeof weatherData.main === 'object' && 
            <View style={weatherDataBlock}>
              <Image 
                style={weatherImage}
                source={{uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}} alt='Weather image' 
              />
              <Text style={weatherDataProperties}>Temperature: {Math.round(weatherData.main.temp) - 273}°C</Text>
              <Text style={weatherDataProperties}>Humidity: {weatherData.main.humidity}%</Text>
            </View>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lastUpdate: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#eee'
  },
  reloadIcon: {
    fontSize: 25,
    color: '#000'
  },
  container: {
    marginTop: '16%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  weatherDataBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  location: {
    fontSize: 24,
    marginBottom: 30
  },
  weatherImage: {
    width: 50, 
    height: 50,
    marginBottom: 30
  },
  weatherDataProperties: {
    fontSize: 20,
    marginBottom: 5
  }
});