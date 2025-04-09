import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { WeatherService } from '../../services/weather.service';
import * as WeatherActions from './weather.actions';
import { of } from 'rxjs';

@Injectable()
export class WeatherEffects {
  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {}

  // Gets weather for a single location using lat and lon values
  public loadWeatherForLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.loadWeatherForLocation),
      mergeMap(action =>
        this.weatherService.getWeatherForLocation(action.lat, action.lon).pipe(
          map(weatherResponse => WeatherActions.loadWeatherForLocationSuccess({ weatherResponse })),
          catchError(error => of(WeatherActions.loadWeatherForLocationFailure({ error })))
        )
      )
    )
  );

  // Gets weather for multible locations, this acceps a list of id's used by the open weather api to fetch weather for multiple locations in a single call
  public loadWeatherForLocations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.loadWeatherForLocations),
      mergeMap(action =>
        this.weatherService.getWeatherForLocations(action.locations).pipe(
          map(
            weatherResponse => WeatherActions.loadWeatherForLocationsSuccess({ weatherResponse: weatherResponse.list })
          ),
          catchError(error => of(WeatherActions.loadWeatherForLocationsFailure({ error })))
        )
      )
    )
  );
}