export const locationHasErrored = (bool) => ({
  type: 'LOCATION_HAS_ERRORED',
  hasErrored: bool,
})

export const locationIsLoading = (bool) => ({
  type: 'LOCATION_IS_LOADING',
  isLoading: bool,
})

export const locationFetchDataSuccess = (location) => ({
  type: 'LOCATION_FETCH_DATA_SUCCESS',
  location,
})

export function locationFetchData(url) {
  return (dispatch) => {
    dispatch(locationIsLoading(true));

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(locationIsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(locationData => {
        dispatch(locationFetchDataSuccess(locationData))
      })
      .catch(() => dispatch(locationHasErrored(true)));
  };
}
