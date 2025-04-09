import { createReducer, on } from '@ngrx/store';
import * as WeatherActions from './weather.actions';
import { CityWeatherItem } from '../../models/CityWeatherItem.model';
import { WeatherResponse } from '../../models/WeatherResponse.model';

export interface WeatherState {
  cityList: Array<CityWeatherItem>;
  loadingCityWeatherList: boolean;
  loadingWeatherDetailsForCity: boolean;
  error: any;
};

export const initialState: WeatherState = {
  cityList: [],
  loadingCityWeatherList: true,
  loadingWeatherDetailsForCity: true,
  error: null
};

export const weatherResponseToCityWeatherItem = (weatherResponse: WeatherResponse): CityWeatherItem => ({
  id: weatherResponse.id,
  name: weatherResponse.name,
  temperature: "100c",
  windSpeed: '100',
  lat: weatherResponse.coord.lat, 
  lon: weatherResponse.coord.lon
});

/**
 * This essentially acts as a layer to transform our API responses from the open weather api, as well as handle any local state updates,
 * into our state models. 
 * 
 * Components will then take these state models, and transform them into component specific models, enhancing their reuse 
 * and decoupling the state and presentation layers. 
 */
export const weatherReducer = createReducer(
  initialState,
  // Reducers for fetching single weather item 
  on(WeatherActions.loadWeatherForLocation, state => ({ ...state, loadingWeatherDetail: true })),
  on(WeatherActions.loadWeatherForLocationSuccess, (state, { weatherResponse }) => ({
    ...state,
    cityList: [
      ...state.cityList, 
      weatherResponseToCityWeatherItem(weatherResponse)
    ],
    loadingWeatherDetailsForCity: false
  })),
  on(WeatherActions.loadWeatherForLocationFailure, (state, { error }) => ({
    ...state,
    error,
    loadingWeatherDetailsForCity: false
  })),

  // Reducers for fetching multiple weather item 
  on(WeatherActions.loadWeatherForLocations, state => ({ ...state, loadingCityWeatherList: true })),
  on(WeatherActions.loadWeatherForLocationsSuccess, (state, { weatherResponse }) => ({
    ...state,
    cityList: [
      ...state.cityList, 
      ...weatherResponse.map(weatherResponseToCityWeatherItem)
    ],
    loadingCityWeatherList: false
  })),
  on(WeatherActions.loadWeatherForLocationsFailure, (state, { error }) => ({
    ...state,
    error,
    loadingCityWeatherList: false
  }))
);