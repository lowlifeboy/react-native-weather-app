export const weatherHasErrored = (bool) => ({
  type: 'WEATHER_HAS_ERRORED',
  hasErrored: bool,
})

export const weatherIsLoading = (bool) => ({
  type: 'WEATHER_IS_LOADING',
  isLoading: bool,
})

export const weatherFetchDataSuccess = (weather) => ({
  type: 'WEATHER_FETCH_DATA_SUCCESS',
  weather,
})

export function weatherFetchData(url) {
  return (dispatch) => {
    dispatch(weatherIsLoading(true));

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(weatherIsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(weatherData => dispatch(weatherFetchDataSuccess(weatherData)))
      .catch(() => dispatch(weatherHasErrored(true)));
  };
}
