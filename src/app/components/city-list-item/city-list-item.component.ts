import { Component, Input } from '@angular/core';

// View model for this component
export interface CityListItem {
  cityName: string,
  temp: string,
  windSpeed: string
}

@Component({
  selector: 'app-city-list-item',
  standalone: true,
  templateUrl: './city-list-item.component.html',
  styleUrls: ['./city-list-item.component.css']
})
export class CityListItemComponent {
  @Input()city!: CityListItem;
}