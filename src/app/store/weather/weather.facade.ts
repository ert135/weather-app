import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as WeatherActions from './weather.actions';
import * as WeatherSelectors from './weather.selectors';
import { map } from 'rxjs';
import { CityWeatherItem } from '../../models/CityWeatherItem.model';

@Injectable({ providedIn: 'root' })
export class WeatherFacade {
/**
 * This component is used to decouple the state logic from the presentation logic.
 * It might seem gratuitous in an app of this size, as does trhe use of ngrx, but in larger apps, it's useful
 * to have different models for our state and presentation layers.
 *
 * This decoupling allows us to reuse our presentational components.
 * They just need to inject this class and provide a transformer to convert
 * the state model into an app-specific presentation or view model.
 * 
 * This also makes it easier to unit test presentational components, we dont have to mock the entire state layer for weather in our component tests, just this smaller interface.
 * This would be especially useful if we had a high amount of complex state logic.
 */
  cities$ = <T>(transformer: (cityList: CityWeatherItem[]) => T) =>
    this.store.select(WeatherSelectors.selectCityList).pipe(map(transformer));

  loadingCityList$ = this.store.select(WeatherSelectors.selectLoadingCityList);

  error$ = this.store.select(WeatherSelectors.selectError);

  constructor(private store: Store) {}

  loadWeatherForLocation(lat: number, lon: number) {
    this.store.dispatch(WeatherActions.loadWeatherForLocation({lat, lon}));
  }

  loadWeatherForLocations(locations: Array<number>) {
    this.store.dispatch(WeatherActions.loadWeatherForLocations({locations}));
  }
}