import { TestBed } from '@angular/core/testing';
import { WeatherEffects } from './weather.effects';
import { WeatherService } from '../../services/weather.service';
import * as WeatherActions from './weather.actions';
import { of } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { WeatherGroupResponse, WeatherResponse } from '../../models/WeatherResponse.model';

const mockWeatherService = jasmine.createSpyObj('WeatherService', ['getWeatherForLocation', 'getWeatherForLocations']);

describe('WeatherEffects', () => {
  let actions$: Actions;
  let effects: WeatherEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherEffects,
        provideMockActions(() => actions$),
        { provide: WeatherService, useValue: mockWeatherService }
      ]
    });

    effects = TestBed.inject(WeatherEffects);
  });

  describe('loadWeatherForLocation$', () => {
    it('should dispatch loadWeatherForLocationSuccess on successful weather fetch', () => {
      const lat = 12.34;
      const lon = 56.78;
      const weatherResponse: WeatherResponse = {
        coord: { lat, lon },
        weather: [
          { id: 1, main: 'Clear', description: 'Clear sky', icon: '01d', title: 'clear', completed: true }
        ],
        base: 'stations',
        main: {
          temp: 298.15,
          feels_like: 296.5,
          temp_min: 295.0,
          temp_max: 300.0,
          pressure: 1013,
          humidity: 60,
          sea_level: 1013,
          grnd_level: 1009
        },
        visibility: 10000,
        wind: { speed: 3.6, deg: 200, gust: 4.5 },
        rain: { '1h': 0 },
        clouds: { all: 0 },
        dt: 1633024800,
        sys: { type: 1, id: 1234, country: 'US', sunrise: 1633008082, sunset: 1633051182 },
        timezone: -14400,
        id: 5128581,
        name: 'New York',
        cod: 200
      };

      const action = WeatherActions.loadWeatherForLocation({ lat, lon });
      const successAction = WeatherActions.loadWeatherForLocationSuccess({ weatherResponse });

      // Mocking the return value for the service call
      mockWeatherService.getWeatherForLocation.and.returnValue(of(weatherResponse));

      actions$ = hot('-a-', { a: action });
      const expected = cold('-b', { b: successAction });

      expect(effects.loadWeatherForLocation$).toBeObservable(expected);
    });
  });

  describe('loadWeatherForLocations$', () => {
    it('should dispatch loadWeatherForLocationsSuccess on successful fetch for multiple locations', () => {
      const locations = [2643743, 2988507, 2950159];
      const weatherGroupResponse: WeatherGroupResponse = {
        cnt: 3,
        list: [
          {
            coord: { lat: 51.5074, lon: -0.1278 },
            weather: [{ id: 1, main: 'Clear', description: 'Clear sky', icon: '01d', title: 'clear', completed: true }],
            base: 'stations',
            main: { temp: 295.15, feels_like: 296.5, temp_min: 295.0, temp_max: 300.0, pressure: 1013, humidity: 60, sea_level: 1013, grnd_level: 1009 },
            visibility: 10000,
            wind: { speed: 3.6, deg: 200, gust: 4.5 },
            rain: { '1h': 0 },
            clouds: { all: 0 },
            dt: 1633024800,
            sys: { type: 1, id: 1234, country: 'GB', sunrise: 1633008082, sunset: 1633051182 },
            timezone: -14400,
            id: 2643743,
            name: 'London',
            cod: 200
          }
        ]
      };

      const action = WeatherActions.loadWeatherForLocations({ locations });
      const successAction = WeatherActions.loadWeatherForLocationsSuccess({ weatherResponse: weatherGroupResponse.list });

      // Mocking the return value for the service call
      mockWeatherService.getWeatherForLocations.and.returnValue(of(weatherGroupResponse));

      actions$ = hot('-a-', { a: action });
      const expected = cold('-b', { b: successAction });

      expect(effects.loadWeatherForLocations$).toBeObservable(expected);
    });
  });
});
