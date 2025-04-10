import { WeatherFacade } from './weather.facade';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import * as WeatherSelectors from './weather.selectors';
import * as WeatherActions from './weather.actions';
import { CityWeatherItem } from '../../models/CityWeatherItem.model';

describe('WeatherFacade', () => {
  let facade: WeatherFacade;
  let store: MockStore;

  const mockCityList: CityWeatherItem[] = [
    {
      id: 1,
      name: 'London',
      temperature: '20°C',
      windSpeed: '5m/s',
      lat: 51.51,
      lon: -0.13
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherFacade,
        provideMockStore()
      ]
    });

    facade = TestBed.inject(WeatherFacade);
    store = TestBed.inject(MockStore);
  });

  it('should expose transformed city list through cities$', (done) => {
    store.overrideSelector(WeatherSelectors.selectCityList, mockCityList);

    const transformer = (items: CityWeatherItem[]) =>
      items.map((item) => ({ label: item.name, id: item.id }));

    facade.cities$(transformer).subscribe((transformed) => {
      expect(transformed).toEqual([{ label: 'London', id: 1 }]);
      done();
    });
  });

  it('should expose loadingCityList$', (done) => {
    store.overrideSelector(WeatherSelectors.selectLoadingCityList, true);
    facade.loadingCityList$.subscribe((loading) => {
      expect(loading).toBeTrue();
      done();
    });
  });

  it('should expose error$', (done) => {
    const error = { message: 'Something went wrong' };
    store.overrideSelector(WeatherSelectors.selectError, error);
    facade.error$.subscribe((err) => {
      expect(err).toEqual(error);
      done();
    });
  });

  it('should dispatch loadWeatherForLocation action', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    facade.loadWeatherForLocation(10, 20);

    expect(dispatchSpy).toHaveBeenCalledWith(
      WeatherActions.loadWeatherForLocation({ lat: 10, lon: 20 })
    );
  });

  it('should dispatch loadWeatherForLocations action', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const locations = [123, 456];
    facade.loadWeatherForLocations(locations);

    expect(dispatchSpy).toHaveBeenCalledWith(
      WeatherActions.loadWeatherForLocations({ locations })
    );
  });
});
