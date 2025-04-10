import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherGroupResponse, WeatherResponse } from '../models/WeatherResponse.model';
import { CityResponseList } from '../models/CityResponse.model';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) {}

  private apiRoot = 'http://api.openweathermap.org';
  // This would not be stored here in a real app, it would be fetched via a user sign in mechanism and perhaps passed into this class via a config service. 
  private api_key = '3945f225807c5ab7987c69c653dad77e';

  // This isnt used, but could be used to itertate in future. Just left in as an example
  getWeatherForLocation(lat: number, lon: number): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(this.apiRoot + `/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.api_key}`);
  }

  getWeatherForLocations(locations: Array<number>): Observable<WeatherGroupResponse> {
    console.log("Endpoint is: ", this.apiRoot + `/data/2.5/group?id={${locations.join(',')}}&appid={${this.api_key}}`);
    return this.http.get<WeatherGroupResponse>(this.apiRoot + `/data/2.5/group?id=${locations.join(',')}&appid=${this.api_key}`);
  }

  // This isnt used, but could be used to itertate in future to add a city serarch feature. 
  cityLookup(city: string, countryCode: string): Observable<CityResponseList> {
    return this.http.get<CityResponseList>(this.apiRoot + `/geo/1.0/direct?q=${city},${countryCode}&limit=5&appid=${this.api_key}`);
  }
}