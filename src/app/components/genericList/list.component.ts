import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'list-component',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListingComponent<T> {
  /**
   * This is an example of how we can use genertic types to reuse rendering logic, this class can be used to render any data that's in an array.
   * 
   * This component could be extended in future to render items in a list, or a flex box across the page, all using a generic interface. 
  */
  @Input() items: T[] = [];
  @Input() itemTemplate!: TemplateRef<{ $implicit: T }>;
}
