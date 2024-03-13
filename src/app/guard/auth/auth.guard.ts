import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { urls } from 'src/app/lib/urls';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Auth } from 'src/app/shared/store/auth/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService, private store: Store<Auth>) {}
  canActivate(): Observable<boolean> {
    return this.auth.isAuthenticated().pipe(
      map((authenticated: boolean | any) => {
        if (!authenticated) {
          this.router.navigate([`${urls.login}`]);
          return false
        }
        return true;
      })
    )
  }
}
