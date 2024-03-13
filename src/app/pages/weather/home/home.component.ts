import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AuthModel } from 'src/app/shared/store/auth/auth.model';
import { selectLoggedInUser } from 'src/app/shared/store/auth/auth.selector';
import { getGeolocation, getWeatherForecastByGeolocation } from 'src/app/shared/store/weather/weather.action';
import { GeolocationModel, Weather } from 'src/app/shared/store/weather/weather.model';
import { selectGeolocation } from 'src/app/shared/store/weather/weather.selector';
import { WeatherState } from 'src/app/shared/store/weather/weather.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup | any;
  user$: Observable<AuthModel> = of();
  constructor(
    protected formBuilder: FormBuilder,
    private store: Store<Weather>
  ) {}
  ngOnInit(): void {
    this.getLoggedInUser();
    this.initForm();
  }
  getLoggedInUser() {
    this.user$ = this.store.select(selectLoggedInUser);
  }
  initForm(): void {
    this.searchForm = this.formBuilder.group({
      city: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ]),
      ],
    });
  }
  onHandleSubmit(): void {
    this.store.dispatch(getGeolocation(this.searchForm.value));
    this.store.select(selectGeolocation).subscribe((geolocation: GeolocationModel) => {
      if (geolocation !== WeatherState.geolocation) {
        const params = {
          lat: geolocation.lat,
          lon: geolocation.lon,
          appid: environment.weather.key,
          units: environment.weather.units,
          city: this.searchForm.value.city
        };
        this.store.dispatch(getWeatherForecastByGeolocation(params));
      }
    });
  }
}
