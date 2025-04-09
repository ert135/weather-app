import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import { WeatherEffects } from './store/weather/weather.effects';
import { StoreModule } from '@ngrx/store';
import { weatherReducer } from './store/weather/weather.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      StoreModule.forRoot({ weather: weatherReducer }),
      HttpClientModule
    ),
    provideEffects([WeatherEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false
    }),
  ],
};