import { createAction, props } from '@ngrx/store';
import { WeatherResponse } from '../../models/WeatherResponse.model';

// Actions for loading data for single location - used to add data to the city list 
export const loadWeatherForLocation = createAction(
  '[Weather] Load Weather Item',
  props<{ lat: number; lon: number }>() 
);
export const loadWeatherForLocationSuccess = createAction(
  '[Weather] Load weather item success',
  props<{ weatherResponse: WeatherResponse }>()
);
export const loadWeatherForLocationFailure = createAction(
  '[Weather] Load weather item failure',
  props<{ error: any }>()
);

// Actions for loading data for multiple locations - used to populate default city list data with a number of default locations
export const loadWeatherForLocations = createAction(
  '[Weather] Load Weather Items',
  props<{ locations: Array<number> }>()
);

export const loadWeatherForLocationsSuccess = createAction(
  '[Weather] Load weather items success',
  props<{ weatherResponse: Array<WeatherResponse> }>()
);

export const loadWeatherForLocationsFailure = createAction(
  '[Weather] Load weather items failure',
  props<{ error: any }>()
);