import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherFacade } from '../../store/weather/weather.facade';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { CityWeatherDetail } from '../../models/CityWeatherDetail.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css']
})
export class WeatherDetailComponent implements OnInit {
  selectedCity$: Observable<CityWeatherDetail | null> | undefined;
  error$ = this.weatherFacade.error$;

  constructor(
    private weatherFacade: WeatherFacade,
    private route: ActivatedRoute
  ) {}

  /**
   * As explained in weather.facade.ts, this decouples the state model from the presentation model 
   * via the transformer here. This searches the state for a matcghing city via ID, if it cant find one it 
   * calls the facade the load the city
  */
  ngOnInit(): void {
    this.selectedCity$ = this.route.paramMap.pipe(
      switchMap(params => {
        const cityId = parseInt(params.get('id')!, 10);

        return this.weatherFacade.cities$<CityWeatherDetail | null>((cityList) => {
          const foundCity = cityList.find((cityStateItem) => cityStateItem.id === cityId) || null;

          /**
           * Just reusing the loadWeatherForLocations fucntion here thats used elsewhere for simplicity 
          */
          if (!foundCity) {
            this.weatherFacade.loadWeatherForLocations([cityId]);
          }

          return foundCity
            ? {
                cityName: foundCity.name,
                icon: foundCity.currentWeather.icon,
                currentTemp: foundCity.temperature,
                max_temp: foundCity.maxTemp,
                min_temp: foundCity.minTemp,
                title: foundCity.currentWeather.title,
                description: foundCity.currentWeather.description,
                windSpeed: foundCity.windSpeed
              }
            : null;
        });
      })
    );
  }
}
