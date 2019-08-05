import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

// const city

export default class Weather extends React.Component {
  state = {
    weatherData: {},
    hasErrored: false,
    isLoading: false
  }

  fetchData = (url) => {
    this.setState({ isLoading: true });

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        this.setState({ isLoading: false });

        return response;
      })
      .then(res => res.json())
      .then(weatherData => this.setState({ weatherData}))
      .catch(() => this.setState({ hasErrored: true }));
      
  }

  componentDidMount() {
    this.fetchData(`https://api.openweathermap.org/data/2.5/weather?q=${this.props.city},${this.props.country_name}&APPID=d52724e6bdb1b53c4277e62ac1e71740`)
  }
  
  render() {
    const { city, country_name } = this.props;
    const { weatherData } = this.state;
    const { container, weatherDataBlock, location, weatherDescription, weatherImage, weatherDataProperties } = styles;

    if (this.props.hasErrored) {
      return <Text>Sorry! There was an error loading the items</Text>;
    }

    if (this.props.isLoading) {
      return <Text>Loading...</Text>;
    }

    return (
      <View style={container}>
        <Text style={location}>{city}, {country_name}</Text>
        {typeof weatherData === 'object' && 
          typeof weatherData.main === 'object' && 
          <View style={weatherDataBlock}>
            <View style={weatherDescription}>
              <Image 
                style={weatherImage}
                source={{uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}} alt='Weather image' 
              />
              <Text>{weatherData.weather[0].main}</Text>
            </View>
            <Text style={weatherDataProperties}>Temperature: {Math.round(weatherData.main.temp) - 273}°C</Text>
            <Text style={weatherDataProperties}>Humidity: {weatherData.main.humidity}%</Text>
          </View>
        }
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
  location: {
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

// const mapStateToProps = (state) => ({
//   weather: state.weather,
//   hasErrored: state.weatherHasErrored,
//   isLoading: state.weatherIsLoading,
// });

// const mapDispatchToProps = (dispatch) => ({
//   fetchData: url => dispatch(weatherFetchData(url)),
// });

// const WeatherListConnection = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Weather);

// export default WeatherListConnection;