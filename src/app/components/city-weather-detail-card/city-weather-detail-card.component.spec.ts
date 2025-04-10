import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityWeatherDetailCardComponent } from './city-weather-detail-card.component';
import { CityWeatherDetail } from '../../models/CityWeatherDetail.model';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('CityWeatherDetailCardComponent', () => {
  let component: CityWeatherDetailCardComponent;
  let fixture: ComponentFixture<CityWeatherDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, CityWeatherDetailCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CityWeatherDetailCardComponent);
    component = fixture.componentInstance;
  });

  it('should render city details when city data is provided', () => {
    const mockCity: CityWeatherDetail = {
      cityName: 'New York',
      icon: 'sunny',
      title: 'Clear Sky',
      currentTemp: '22°C',
      max_temp: '26°C',
      min_temp: '18°C',
      description: 'Clear sky',
      windSpeed: '15 m/s',
    };

    component.city = mockCity;
    fixture.detectChanges();

    const cityNameElement = fixture.debugElement.query(By.css('h1'));
    expect(cityNameElement.nativeElement.textContent).toContain('New York');
    
    const iconElement = fixture.debugElement.query(By.css('span.text-5xl'));
    expect(iconElement.nativeElement.textContent).toBe('sunny');
    
    const tempElement = fixture.debugElement.query(By.css('p'));
    expect(tempElement.nativeElement.textContent).toContain('Clear sky');
  });

  it('should display "No city data available" when no city data is provided', () => {
    component.city = undefined;
    fixture.detectChanges();

    const noCityElement = fixture.debugElement.query(By.css('.text-center'));
    expect(noCityElement.nativeElement.textContent).toContain('No city data available');
  });
});
