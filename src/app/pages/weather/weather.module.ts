import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { MaterialThemeModule } from 'src/app/material-theme/material-theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatatableModule } from 'src/app/components/datatable/datatable.module';
import { InputModule } from 'src/app/components/form/input/input.module';
import { ResultComponent } from './result/result.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    ResultComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialThemeModule,
    DatatableModule,
    InputModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WeatherModule { }
