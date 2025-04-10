import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CityListItem } from '../../models/CityListItem.model';

@Component({
  selector: 'app-city-list-item',
  standalone: true,
  templateUrl: './city-list-item.component.html',
  styleUrls: ['./city-list-item.component.css']
})

export class CityListItemComponent {
  @Input()city!: CityListItem;

  constructor(private router: Router) {}

  goToCityDetails(cityId: number) {
    this.router.navigate([`/city/${cityId}`]);
  }
}