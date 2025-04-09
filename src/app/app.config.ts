import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { weatherReducer } from './store/weather/weather.reducer';
import { WeatherEffects } from './store/weather/weather.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ weatherState: weatherReducer }),
    provideEffects([WeatherEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false // set true if you only want it enabled in production
    })
  ]
};