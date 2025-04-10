// main.component.ts
import { Component, OnInit } from '@angular/core';
import { WeatherFacade } from '../../store/weather/weather.facade';
import { CommonModule } from '@angular/common';
import { ListingComponent } from '../../components/genericList/list.component';
import { RouterOutlet } from '@angular/router';
import { CityListItemComponent } from '../../components/city-list-item/city-list-item.component';
import { filter, take } from 'rxjs';
import { CityListItem } from '../../models/CityListItem.model';

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
   * via the transformer here. This transforms the state model into a view model 
   * thats understood by the list item component.
  */
  cities$ = this.weatherFacade.cities$<Array<CityListItem>>((cityList) => cityList.map((cityListItem) => ({
    id: cityListItem.id,
    cityName: cityListItem.name,
    temp: cityListItem.temperature,
    windSpeed: cityListItem.windSpeed
  })));

  error$ = this.weatherFacade.error$;

  constructor(private weatherFacade: WeatherFacade) {}

  ngOnInit() {
    /**
     * This function kicks off the process to fetch data, the cities$ obserable above will be triggered when data when fetched.
     * 
     * In a real app these values would come from search functionality, allowing users to search for a city and add items to the cities list
     * and maybe save them to local storage and hydrate the state from there.
     * 
     * For right now though this just gets a hard coded default list.
    */
    const defaultLocations = [2643743, 2988507, 2950159, 3169070, 3117735];
    this.cities$.pipe(
      take(1),
      filter(cities => cities.length < defaultLocations.length)
    ).subscribe(() => {
      this.weatherFacade.loadWeatherForLocations(defaultLocations);
    });
  }
}