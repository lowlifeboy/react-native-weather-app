import React from 'react';
import { Text } from 'react-native';
import Weather from './Weather';

import { connect } from 'react-redux';
import { locationFetchData } from '../actions/location';

class Location extends React.Component {
  componentDidMount() {

    // AsyncStorage.getItem('locationData')
    //   ? AsyncStorage.getItem('locationData')
    //       .then(value => {
    //         this.setState({ locationData: JSON.parse(value) });
    //       })
    //       .done()
    //   : this.props.fetchData(
    //       'https://api.ipdata.co?api-key=1dc33f4b92d30b0d339d5cc30fc51f8a106686a6037c4883ba51318c'
    //     );

    this.props.fetchData(
      'https://api.ipdata.co?api-key=1dc33f4b92d30b0d339d5cc30fc51f8a106686a6037c4883ba51318c'
    );
  }

  render() {

    if (this.props.hasErrored) {
      return <Text>Sorry! There was an error loading the location data</Text>;
    }

    if (this.props.isLoading) {
      return <Text>Loading...</Text>;
    }

    return (
      this.props.location.city && this.props.location.country_name ? (
        <Weather city={this.props.location.city} country_name={this.props.location.country_name} />
      ) : null
    );
  }
}

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
