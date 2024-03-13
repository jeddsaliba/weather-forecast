import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialThemeModule } from './material-theme/material-theme.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { TemplateComponent } from './template/template.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { PromptEffect } from './shared/store/prompt/prompt.effect';
import { ToolbarComponent } from './template/toolbar/toolbar.component';
import { environment } from 'src/environments/environment';
import { DialogComponent } from './components/dialog/dialog.component';
import { DataTableEffect } from './shared/store/datatable/datatable.effect';
import { datatableReducer } from './shared/store/datatable/datatable.reducer';
import { InputModule } from './components/form/input/input.module';
import { ErrorComponent } from './pages/error/error.component';
import { weatherReducer } from './shared/store/weather/weather.reducer';
import { WeatherEffect } from './shared/store/weather/weather.effect';
import { AuthEffect } from './shared/store/auth/auth.effect';
import { authReducer } from './shared/store/auth/auth.reducer';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    TemplateComponent,
    ErrorComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialThemeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    InputModule,
    StoreModule.forRoot({
      auth: authReducer,
      weather: weatherReducer,
      datatable: datatableReducer,
    }),
    !environment.production
            ? StoreDevtoolsModule.instrument({
                maxAge: 25, // Retains last 25 states
                logOnly: environment.production, // Restrict extension to log-only mode
            })
            : [],
    EffectsModule.forRoot([
      AuthEffect,
      WeatherEffect,
      DataTableEffect,
      PromptEffect
    ]),
    AuthModule.forRoot({
      domain: environment.auth.domain,
      clientId: environment.auth.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-US'
    },
    DatePipe
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
