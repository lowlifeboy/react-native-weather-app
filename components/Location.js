import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Weather from './Weather';

import { connect } from 'react-redux';
import { locationFetchData } from '../actions/location';

class Location extends React.Component {
  componentDidMount() {
    this.props.fetchData(
      'https://api.ipdata.co?api-key=1dc33f4b92d30b0d339d5cc30fc51f8a106686a6037c4883ba51318c'
    );
  }

  render() {
    const { lastUpdate } = styles;

    if (this.props.hasErrored) {
      return (
        <View style={lastUpdate}>
          <Text>Sorry! There was an error loading the location data</Text>
        </View>
      );
    }

    if (this.props.isLoading) {
      return (
        <View style={lastUpdate}>
          <Text>Loading...</Text>
        </View>
      );
    }

    // this.props.location !== [] && console.log(this.props.location.city)

    return (
      this.props.location !== [] && (
        <Weather city={this.props.location.city} country_name={this.props.location.country_name} />
      )
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

const mapStateToProps = state => ({
  location: state.location,
  hasErrored: state.locationHasErrored,
  isLoading: state.locationIsLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(locationFetchData(url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location);
