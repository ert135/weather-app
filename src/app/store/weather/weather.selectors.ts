import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from './weather.reducer';

export const selectWeatherState = createFeatureSelector<WeatherState>('weather');

export const selectCityList = createSelector(
  selectWeatherState,
  state => state.cityList
);

export const selectLoadingCityList = createSelector(
  selectWeatherState,
  state => state.loadingCityWeatherList
);

export const selectError = createSelector(
  selectWeatherState,
  state => state.error
);