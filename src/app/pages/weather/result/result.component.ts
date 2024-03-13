import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ForecastModel, GeolocationModel, WeatherModel } from 'src/app/shared/store/weather/weather.model';
import { selectGeolocation, selectWeatherForecast } from 'src/app/shared/store/weather/weather.selector';
import { setDataTable } from 'src/app/shared/store/datatable/datatable.action';
import {
  WeatherState,
  WeatherTableHeads,
} from 'src/app/shared/store/weather/weather.state';
import { ActivatedRoute, Router } from '@angular/router';
import { getGeolocation, getGeolocationCancel, getWeatherForecastByGeolocation } from 'src/app/shared/store/weather/weather.action';
import { Location } from '@angular/common';
import { titleCase } from 'title-case';
import { urls } from 'src/app/lib/urls';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
})
export class ResultComponent implements OnInit, OnDestroy {
  weatherDetails$: Observable<WeatherModel> = of();
  selectWeatherForecast$: any;
  city = '';
  constructor(
    private store: Store<any>,
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.getParameters();
    this.getWeatherDetails();
  }
  getParameters() {
    this.route.queryParams.subscribe((params: any) => {
      if (params.q) {
        this.city = params.q;
        this.breadcrumbService.set('@cityName', titleCase(this.city));
      } else {
        this.router.navigate([`${urls.home}`]);
      }
    });
  }
  getWeatherDetails() {
    this.selectWeatherForecast$ = this.store
      .select(selectWeatherForecast)
      .subscribe((forecast: ForecastModel[]) => {
        if (forecast[0] === WeatherState.forecast[0]) {
          this.store.dispatch(getGeolocation({ city: this.city }));
          this.store.select(selectGeolocation).subscribe((geolocation: GeolocationModel) => {
            if (geolocation !== WeatherState.geolocation) {
              const params = {
                lat: geolocation.lat,
                lon: geolocation.lon,
                appid: environment.weather.key,
                units: environment.weather.units,
                city: this.city
              };
              this.store.dispatch(getWeatherForecastByGeolocation(params));
            }
          });
        }
        this.store.dispatch(
          setDataTable({
            data: forecast,
            table_heads: WeatherTableHeads,
          })
        );
      });
  }
  goBack() {
    this.location.back();
  }
  ngOnDestroy(): void {
    this.selectWeatherForecast$.unsubscribe();
    this.store.dispatch(getGeolocationCancel());
  }
}
