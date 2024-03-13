import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../rest.service';
import { urls } from 'src/app/lib/urls';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private rest: RestService) {}
  getGeolocation(params: any): Observable<any> {
    return this.rest.get(
      `geo/1.0/${urls.direct}?${this.rest.restEndpointParams(params)}`,
      true
    );
  }
  getWeatherForecastByGeolocation(params: any): Observable<any> {
    return this.rest.get(
      `data/2.5/${urls.forecast}?${this.rest.restEndpointParams(params)}`,
      true
    ); 
  }
  getWeatherByCity(params: any): Observable<any> {
    return this.rest.get(
      `data/2.5/${urls.weather}?${this.rest.restEndpointParams(params)}`,
      true
    );
  }
}
