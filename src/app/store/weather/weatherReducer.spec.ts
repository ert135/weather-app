import { weatherReducer, initialState, weatherResponseToCityWeatherItem } from './weather.reducer';
import * as WeatherActions from './weather.actions';
import { WeatherResponse } from '../../models/WeatherResponse.model';

/**
 * This is the main test file for the state logic. This allows us to test our state logic without inclusing any presentation logic, we just dispatch actions 
 * and assert the state is what we expect
 */
const mockWeatherResponse: WeatherResponse = {
  coord: { lon: -0.13, lat: 51.51 },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
      title: "clear",
      completed: true
    }
  ],
  base: 'stations',
  main: {
    temp: 293.15,
    feels_like: 290.15,
    temp_min: 289.82,
    temp_max: 295.37,
    pressure: 1012,
    humidity: 70,
    sea_level: 1012,
    grnd_level: 1000
  },
  visibility: 10000,
  wind: {
    speed: 5,
    deg: 240,
    gust: 7
  },
  rain: {
    '1h': 0
  },
  clouds: {
    all: 0
  },
  dt: 1618317040,
  sys: {
    type: 1,
    id: 1414,
    country: 'GB',
    sunrise: 1618280461,
    sunset: 1618330501
  },
  timezone: 3600,
  id: 1,
  name: 'London',
  cod: 200
};

const mockWeatherResponse2: WeatherResponse = {
  ...mockWeatherResponse,
  id: 2,
  name: 'Paris',
  coord: { lon: 2.35, lat: 48.85 },
  main: {
    ...mockWeatherResponse.main,
    temp: 295.15
  },
  wind: {
    speed: 6,
    deg: 180,
    gust: 8
  }
};

describe('weatherReducer', () => {
  it('should return initial state when unknown action is dispatched', () => {
    const state = weatherReducer(undefined, { type: 'Unknown' } as any);
    expect(state).toEqual(initialState);
  });

  describe('loadWeatherForLocation', () => {
    it('should set loadingWeatherDetail to true', () => {
      const action = WeatherActions.loadWeatherForLocation({ lat: 1, lon: 1 });
      const state = weatherReducer(initialState, action);
      expect((state as any).loadingWeatherDetail).toBeTrue();
    });
  });

  describe('loadWeatherForLocationSuccess', () => {
    it('should add a city item and stop loading', () => {
      const action = WeatherActions.loadWeatherForLocationSuccess({ weatherResponse: mockWeatherResponse });
      const state = weatherReducer(initialState, action);
      expect(state.cityList.length).toBe(1);
      expect(state.cityList[0]).toEqual(weatherResponseToCityWeatherItem(mockWeatherResponse));
      expect((state as any).loadingWeatherDetailsForCity).toBeFalse();
    });
  });

  describe('loadWeatherForLocationFailure', () => {
    it('should store error and stop loading', () => {
      const error = { message: 'Failed to load' };
      const action = WeatherActions.loadWeatherForLocationFailure({ error });
      const state = weatherReducer(initialState, action);
      expect(state.error).toEqual(error);
      expect((state as any).loadingWeatherDetailsForCity).toBeFalse();
    });
  });

  describe('loadWeatherForLocations', () => {
    it('should set loadingCityWeatherList to true', () => {
      const action = WeatherActions.loadWeatherForLocations({ locations: [1, 2] });
      const state = weatherReducer(initialState, action);
      expect(state.loadingCityWeatherList).toBeTrue();
    });
  });

  describe('loadWeatherForLocationsSuccess', () => {
    it('should populate cityList and stop loading', () => {
      const action = WeatherActions.loadWeatherForLocationsSuccess({
        weatherResponse: [mockWeatherResponse, mockWeatherResponse2]
      });
      const state = weatherReducer(initialState, action);
      expect(state.cityList.length).toBe(2);
      expect(state.cityList[0]).toEqual(weatherResponseToCityWeatherItem(mockWeatherResponse));
      expect(state.cityList[1]).toEqual(weatherResponseToCityWeatherItem(mockWeatherResponse2));
      expect(state.loadingCityWeatherList).toBeFalse();
    });
  });

  describe('loadWeatherForLocationsFailure', () => {
    it('should store error and stop loading', () => {
      const error = { message: 'API failed' };
      const action = WeatherActions.loadWeatherForLocationsFailure({ error });
      const state = weatherReducer(initialState, action);
      expect(state.error).toEqual(error);
      expect(state.loadingCityWeatherList).toBeFalse();
    });
  });
});
