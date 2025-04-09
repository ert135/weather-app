import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ListingComponent } from './app/components/genericList/list.component';

bootstrapApplication(ListingComponent, appConfig)
  .catch((err) => console.error(err));
