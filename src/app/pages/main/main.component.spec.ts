import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { WeatherFacade } from '../../store/weather/weather.facade';
import { of } from 'rxjs';
import { CityListItemComponent } from '../../components/city-list-item/city-list-item.component';
import { ListingComponent } from '../../components/genericList/list.component';
import { CommonModule } from '@angular/common';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let weatherFacadeMock: jasmine.SpyObj<WeatherFacade>;

  const mockCities = [
    { id: 1, cityName: 'London', temp: '15°C', windSpeed: '5m/s' },
    { id: 2, cityName: 'Paris', temp: '18°C', windSpeed: '10m/s' },
  ];

  beforeEach(async () => {
    weatherFacadeMock = jasmine.createSpyObj('WeatherFacade', ['cities$', 'loadWeatherForLocations']);

    await TestBed.configureTestingModule({
      imports: [MainComponent, CommonModule, ListingComponent, CityListItemComponent],
      providers: [{ provide: WeatherFacade, useValue: weatherFacadeMock }]
    }).compileComponents();
  });

  function createComponentWithCities(cities: any[] = []) {
    weatherFacadeMock.cities$.and.returnValue(of(cities));
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create the component', () => {
    createComponentWithCities(mockCities);
    expect(component).toBeTruthy();
  });

  it('should render city list when cities$ emits data', () => {
    createComponentWithCities(mockCities);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-city-list-item').length).toBe(mockCities.length);
  });

  it('should show empty state message when there are no cities', () => {
    createComponentWithCities([]);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No items to display.');
  });

  it('should call loadWeatherForLocations if no cities exist', () => {
    createComponentWithCities([]);
    // This is just the mock data were using to bootstrap the app for now
    expect(weatherFacadeMock.loadWeatherForLocations).toHaveBeenCalledWith([
      2643743, 2988507, 2950159, 3169070, 3117735
    ]);
  });
});