export function locationHasErrored(state = false, action) {
  switch (action.type) {
    case 'LOCATION_HAS_ERRORED':
      return action.hasErrored;

    default:
      return state;
  }
}

export function locationIsLoading(state = false, action) {
  switch (action.type) {
    case 'LOCATION_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export function location(state = {}, action) {
  switch (action.type) {
    case 'LOCATION_FETCH_DATA_SUCCESS':
      return action.location;

    default:
      return state;
  }
}
