// main.component.ts
import { Component, OnInit } from '@angular/core';
import { WeatherFacade } from '../../store/weather/weather.facade';
import { CommonModule } from '@angular/common';
import { ListingComponent } from '../../components/genericList/list.component';
import { RouterOutlet } from '@angular/router';
import { CityListItem, CityListItemComponent } from '../../components/city-list-item/city-list-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ListingComponent, CityListItemComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  /**
   * As explained in weather.facade.ts, this decouples the state model from the presentation model 
   * via the transformer here 
   */
  cities$ = this.weatherFacade.cities$<Array<CityListItem>>((cityList) => cityList.map((cityListItem) => ({
    cityName: cityListItem.name,
    temp: cityListItem.temperature,
    windSpeed: cityListItem.windSpeed
  })));

  constructor(private weatherFacade: WeatherFacade) {}

  ngOnInit() {
    /**
     * This kicks off the process to fetch data, the cities$ obserable above will be triggered when data if fetched.
    */
    const defaultLocations = [2643743, 2988507, 2950159, 3169070, 3117735];
    this.weatherFacade.loadWeatherForLocations(defaultLocations);
  }
}