import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityListItemComponent } from './city-list-item.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('CityListItemComponent', () => {
  let component: CityListItemComponent;
  let fixture: ComponentFixture<CityListItemComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [CityListItemComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    });

    fixture = TestBed.createComponent(CityListItemComponent);
    component = fixture.componentInstance;

    component.city = { id: 1, cityName: 'Newport', temp: '25°C', windSpeed: '10m/s' };
    fixture.detectChanges();
  });

  it('should display the city name', () => {
    const cityNameElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(cityNameElement.textContent).toBe('Newport');
  });

  it('should display the temperature', () => {
    const tempElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(tempElement.textContent).toContain('🌡️ Temperature: 25°C');
  });

  it('should display the wind speed', () => {
    const windSpeedElement = fixture.debugElement.queryAll(By.css('p'))[1].nativeElement;
    expect(windSpeedElement.textContent).toContain('💨 Wind Speed: 10m/s');
  });

  it('should call goToCityDetails and navigate to the city details route on click', () => {
    const cardElement = fixture.debugElement.query(By.css(`#city-${component.city.id}`));

    spyOn(component, 'goToCityDetails').and.callThrough();

    cardElement.triggerEventHandler('click', null);

    expect(component.goToCityDetails).toHaveBeenCalledWith(component.city.id);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/city/1']);
  });
});