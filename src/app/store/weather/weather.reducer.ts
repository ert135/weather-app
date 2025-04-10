import { createReducer, on } from '@ngrx/store';
import * as WeatherActions from './weather.actions';
import { CityWeatherItem } from '../../models/CityWeatherItem.model';
import { WeatherResponse } from '../../models/WeatherResponse.model';

export interface WeatherState {
  cityList: Array<CityWeatherItem>;
  loadingCityWeatherList: boolean;
  error: any;
};

export const initialState: WeatherState = {
  cityList: [],
  loadingCityWeatherList: true,
  error: null
};

const kelvinToCelsius = (value: number) => Math.floor(value - 273.15);

const weatherIconMap: { [key: string]: string } = {
  "01d": "☀️", // Clear Sky (Day)
  "01n": "🌙", // Clear Sky (Night)
  "02d": "⛅", // Few Clouds (Day)
  "02n": "☁️", // Few Clouds (Night)
  "03d": "☁️", // Scattered Clouds (Day)
  "03n": "☁️", // Scattered Clouds (Night)
  "04d": "☁️", // Broken Clouds (Day)
  "04n": "☁️", // Broken Clouds (Night)
  "09d": "🌧️", // Shower Rain (Day)
  "09n": "🌧️", // Shower Rain (Night)
  "10d": "🌦️", // Rain (Day)
  "10n": "🌧️", // Rain (Night)
  "11d": "🌩️", // Thunderstorm (Day)
  "11n": "🌩️", // Thunderstorm (Night)
  "13d": "❄️", // Snow (Day)
  "13n": "❄️", // Snow (Night)
  "50d": "🌫️", // Mist (Day)
  "50n": "🌫️", // Mist (Night)
};

function getWeatherEmoji(iconCode: string): string {
  return weatherIconMap[iconCode] || "❓";
}

export const weatherResponseToCityWeatherItem = (weatherResponse: WeatherResponse): CityWeatherItem => ({
  id: weatherResponse.id,
  name: weatherResponse.name,
  windSpeed: String(weatherResponse.wind.speed) + 'm/s',
  lat: weatherResponse.coord.lat, 
  lon: weatherResponse.coord.lon,
  temperature: String(kelvinToCelsius(weatherResponse.main.temp)) + '°C',
  minTemp: String(kelvinToCelsius(weatherResponse.main.temp_min)) + '°C',
  maxTemp: String(kelvinToCelsius(weatherResponse.main.temp_max)) + '°C',
  currentWeather: {
    icon: getWeatherEmoji(weatherResponse.weather[0].icon),
    title: weatherResponse.weather[0].title,
    description: weatherResponse.weather[0].description
  }
});

/**
 * This essentially acts as a layer to transform our API responses from the open weather api, as well as handle any local state updates,
 * into our state models, like adding a city etc.
 * 
 * Components will then take these state models, and transform them into component specific models, enhancing their reuse 
 * and decoupling the state and presentation layers. 
 */
export const weatherReducer = createReducer(
  initialState,
  // Reducers for fetching single weather item
  on(WeatherActions.loadWeatherForLocation, state => ({ ...state, loadingCityWeatherList: true })),
  on(WeatherActions.loadWeatherForLocationSuccess, (state, { weatherResponse }) => ({
    ...state,
    cityList: [
      ...state.cityList, 
      weatherResponseToCityWeatherItem(weatherResponse)
    ],
    loadingCityWeatherList: false
  })),
  on(WeatherActions.loadWeatherForLocationFailure, (state, { error }) => ({
    ...state,
    error,
    loadingCityWeatherList: false
  })),

  // Reducers for fetching multiple weather item 
  on(WeatherActions.loadWeatherForLocations, state => ({ ...state, loadingCityWeatherList: true })),
  on(WeatherActions.loadWeatherForLocationsSuccess, (state, { weatherResponse }) => ({
    ...state,
    cityList: weatherResponse.map(weatherResponseToCityWeatherItem),
    loadingCityWeatherList: false
  })),
  on(WeatherActions.loadWeatherForLocationsFailure, (state, { error }) => ({
    ...state,
    error,
    loadingCityWeatherList: false
  }))
);