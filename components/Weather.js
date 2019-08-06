import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { connect } from 'react-redux';
import { weatherFetchData } from '../actions/weather';

class Weather extends React.Component {
  componentDidMount() {
    this.props.fetchData(`https://api.openweathermap.org/data/2.5/weather?q=${this.props.city},${this.props.country_name}&APPID=d52724e6bdb1b53c4277e62ac1e71740`)
  }
  
  render() {
    const { city, country_name, weather } = this.props;
    const { container, weatherDataBlock, yourLocation, weatherDescription, weatherImage, weatherDataProperties } = styles;

    if (this.props.hasErrored) {
      return <Text>Sorry! There was an error loading the weather data</Text>;
    }

    if (this.props.isLoading) {
      return <Text>Loading...</Text>;
    }

    this.props.weather !== [] && console.log(this.props.weather);

    return (
      <View style={container}>
        <Text style={yourLocation}>{city}, {country_name}</Text>
        {
          console.log(weather)
        }
        {/* <View style={weatherDataBlock}>
          <View style={weatherDescription}> */}
            {/* <Image 
              style={weatherImage}
              source={{uri: `https://openweathermap.org/img/w/${this.props.weather.weather[0].icon}.png`}} alt='Weather image' 
            />
            <Text>{this.props.weather.weather[0].main}</Text>
          </View>
          <Text style={weatherDataProperties}>Temperature: {Math.round(this.props.weather.main.temp) - 273}°C</Text>
          <Text style={weatherDataProperties}>Humidity: {this.props.weather.main.humidity}%</Text> */}
        {/* </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: '16%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  weatherDataBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  yourLocation: {
    fontSize: 24,
    marginBottom: 30
  },
  weatherDescription: {
    width: '100%',
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  weatherImage: {
    width: 50, 
    height: 50
  },
  weatherDataProperties: {
    fontSize: 20,
    marginBottom: 5
  }
});

const mapStateToProps = (state) => ({
  weather: state.weather,
  hasErrored: state.weatherHasErrored,
  isLoading: state.weatherIsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: url => dispatch(weatherFetchData(url)),
});

const WeatherListConnection = connect(
  mapStateToProps,
  mapDispatchToProps
)(Weather)

export default WeatherListConnection;