import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { showPrompt } from '../prompt/prompt.action';
import { Router } from '@angular/router';
import { WeatherService } from '../../services/weather/weather.service';
import { getGeolocationCancel, getGeolocationSuccess, getWeatherDetailsSuccess, getWeatherForecastByGeolocationSuccess } from './weather.action';
import { WeatherType } from './weather.type';
import { environment } from 'src/environments/environment';
import { urls } from 'src/app/lib/urls';
import { titleCase } from 'title-case';
import { Weather } from './weather.model';
import { Store } from '@ngrx/store';

@Injectable()
export class WeatherEffect {
  constructor(
    private weatherService: WeatherService,
    private store: Store<Weather>,
    private actions$: Actions,
    private router: Router,
  ) {}
  _getWeatherDetails = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherType.DETAILS),
      switchMap(({ payload }) => {
        const { city } = payload;
        const params = {
            q: city,
            appid: environment.weather.key,
            units: environment.weather.units
        };
        return this.weatherService.getWeatherByCity(params).pipe(
          map((data) => {
            return getWeatherDetailsSuccess(data);
          }),
          takeUntil(this.actions$.pipe(ofType(WeatherType.DETAILS_CANCEL))),
          catchError(({ error }) => of(showPrompt(titleCase(error?.message, { sentenceCase: true }))))
        );
      })
    );
  });
  _getGeolocation = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherType.GEOLOCATION),
      switchMap(({ payload }) => {
        const { city } = payload;
        const params = {
            q: city,
            appid: environment.weather.key
        };
        return this.weatherService.getGeolocation(params).pipe(
          map((data) => {
            if (data.length > 0) {
              return getGeolocationSuccess(data);
            }
            this.store.dispatch(showPrompt('City not found.'));
            return getGeolocationCancel();
          }),
          takeUntil(this.actions$.pipe(ofType(WeatherType.GEOLOCATION_CANCEL))),
          catchError(({ error }) => of(showPrompt(titleCase(error?.message, { sentenceCase: true }))))
        );
      })
    );
  });

  _getWeatherForecastByGeolocation = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherType.FORECAST),
      switchMap(({ payload }) => {
        return this.weatherService.getWeatherForecastByGeolocation(payload).pipe(
          map((data) => {
            return getWeatherForecastByGeolocationSuccess(data);
          }),
          tap(() => {
            this.router.navigate([`${urls.home}/${urls.result}`], {
              queryParams: {
                  q: payload['city']
              }
            })
          }),
          takeUntil(this.actions$.pipe(ofType(WeatherType.FORECAST_CANCEL))),
          catchError(({ error }) => of(showPrompt(titleCase(error?.message, { sentenceCase: true }))))
        );
      })
    );
  });
}
