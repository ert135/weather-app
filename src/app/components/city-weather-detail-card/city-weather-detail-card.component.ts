import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CityWeatherDetail } from '../../models/CityWeatherDetail.model';

@Component({
  selector: 'app-city-weather-detail-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city-weather-detail-card.component.html',
  styleUrl: './city-weather-detail-card.component.css'
})
export class CityWeatherDetailCardComponent {
  @Input() city?: CityWeatherDetail;
}
