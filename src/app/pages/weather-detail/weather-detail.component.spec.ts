import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherDetailComponent } from './weather-detail.component';
import { WeatherFacade } from '../../store/weather/weather.facade';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { convertToParamMap } from '@angular/router';
import { CityWeatherItem } from '../../models/CityWeatherItem.model';

describe('WeatherDetailComponent', () => {
  let component: WeatherDetailComponent;
  let fixture: ComponentFixture<WeatherDetailComponent>;
  let weatherFacadeMock: jasmine.SpyObj<WeatherFacade>;
  const mockCityId = 1;
  
  // Sample data for testing
  const mockCity: CityWeatherItem = {
    id: 1,
    name: 'London',
    temperature: '15°C',
    windSpeed: '5m/s',
    currentWeather: {
      icon: 'sunny',
      title: 'Clear Sky',
      description: 'Clear and sunny weather.'
    },
    maxTemp: "20",
    minTemp: "10",
    lat: 0,
    lon: 0
  };

  beforeEach(async () => {
    weatherFacadeMock = jasmine.createSpyObj('WeatherFacade', ['cities$', 'loadWeatherForLocations']);

    await TestBed.configureTestingModule({
      imports: [WeatherDetailComponent],
      providers: [
        { provide: WeatherFacade, useValue: weatherFacadeMock },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ id: mockCityId.toString() })) }
        }
      ]
    }).compileComponents();
  });

  function createComponentWithCities(city: any) {
    weatherFacadeMock.cities$.and.returnValue(of(city));
    fixture = TestBed.createComponent(WeatherDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create the component', () => {
    createComponentWithCities(mockCity);
    expect(component).toBeTruthy();
  });

  it('should fetch city weather data when city is found', () => {
    createComponentWithCities(mockCity);

    fixture.detectChanges();

    component.selectedCity$?.subscribe((cityDetail: any) => {
      expect(cityDetail).toBeTruthy();
      expect(cityDetail?.name).toBe(mockCity.name);
      expect(cityDetail?.temperature).toBe(mockCity.temperature);
    });
  });
});
