export function weatherHasErrored(state = false, action) {
  switch (action.type) {
    case 'WEATHER_HAS_ERRORED':
      return action.hasErrored;

    default:
      return state;
  }
}

export function weatherIsLoading(state = false, action) {
  switch (action.type) {
    case 'WEATHER_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export function weather(state = [], action) {
  switch (action.type) {
    case 'WEATHER_FETCH_DATA_SUCCESS':
      return action.weather;

    default:
      return state;
  }
}
