import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { WeatherDetailComponent } from './pages/weather-detail/weather-detail.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'city/:name', component: WeatherDetailComponent },
    { path: '**', redirectTo: '' } // fallback
];