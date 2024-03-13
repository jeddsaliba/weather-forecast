import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from 'src/app/shared/store/auth/auth.action';
import { Auth } from 'src/app/shared/store/auth/auth.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  appName: string = environment.appName;
  constructor(public store: Store<Auth>) {}
  login(): void {
    this.store.dispatch(login());
  }
}
