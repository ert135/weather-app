import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'list-component',
  // It makes sense for tihs component to be standalone as its generic and not linked to a module
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListingComponent<T> {
  @Input() items: T[] = [];
  @Input() itemTemplate!: TemplateRef<T>;
}
