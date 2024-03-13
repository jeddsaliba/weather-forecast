import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultComponent } from './result/result.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    data: {
      breadcrumb: {
        label: 'Home'
      }
    },
    children: [
      {
        path : '',
        pathMatch: 'full',
        component: HomeComponent,
      }, {
        path: 'result',
        component: ResultComponent,
        data: {
          breadcrumb: {
            alias: 'cityName'
          }
        }
      },
    ],
    // component: HomeComponent,
    // data: {
    //   breadcrumb: {
    //     label: 'Home'
    //   }
    // }
  // }, {
  //   path: 'result',
  //   component: ResultComponent,
  //   data: {
  //     breadcrumb: {
  //       label: 'Result'
  //     }
  //   }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule { }
