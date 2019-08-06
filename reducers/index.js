import { combineReducers } from 'redux';
import { weather, weatherHasErrored, weatherIsLoading } from './weather';
import { location, locationHasErrored, locationIsLoading } from './location';

export default combineReducers({
  weather,
  weatherHasErrored,
  weatherIsLoading,
  location,
  locationHasErrored,
  locationIsLoading,
});