import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getLoggedInUser, getLoggedInUserSuccess, isAuthenticatedSuccess } from './auth.action';
import { catchError, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { AuthType } from './auth.type';
import {
  showPrompt
} from '../prompt/prompt.action';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Auth, AuthModel } from './auth.model';
import { urls } from 'src/app/lib/urls';
import { AuthService } from '../../services/auth/auth.service';
import { selectLoggedInUser } from './auth.selector';
import { AuthState } from './auth.state';

@Injectable()
export class AuthEffect {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private store: Store<Auth>,
    private router: Router
  ) {}
  _login = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthType.LOGIN),
      switchMap(() => {
        return this.authService.login().pipe(
          tap(() => {
            this.store.dispatch(getLoggedInUser());
            this.store.select(selectLoggedInUser).subscribe((user: AuthModel) => {
              if (user !== AuthState.auth) {
                const message = `Welcome, ${user.name}`;
                this.store.dispatch(showPrompt(message));
                this.router.navigate([`${urls.home}`]);
              }
            });
          }),
          catchError(({ error }) => of(showPrompt(error?.message)))
        );
      })
    );
  }, {
    dispatch: false
  });
  _getAccessToken = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthType.ACCESS_TOKEN),
      switchMap(() => {
        return this.authService.getAccessToken().pipe(
          tap((data) => {
            sessionStorage.setItem('access_token', data);
            this.router.navigate([`${urls.home}`]);
          }),
          takeUntil(this.actions$.pipe(ofType(AuthType.ACCESS_TOKEN_CANCEL))),
          catchError(({ error }) => of(showPrompt(error?.message)))
        );
      })
    );
  });
  _isAuthenticated = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthType.AUTHENTICATED),
      switchMap(() => {
        return this.authService.isAuthenticated().pipe(
          map((data) => {
            return isAuthenticatedSuccess(data);
          }),
          takeUntil(this.actions$.pipe(ofType(AuthType.AUTHENTICATED_CANCEL))),
          catchError(({ error }) => of(showPrompt(error?.message)))
        );
      })
    );
  });
  _getLoggedInUser = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthType.LOGGED_IN_USER_DETAILS),
      switchMap(() => {
        return this.authService.getLoggedInUser().pipe(
          map((data) => {
            return getLoggedInUserSuccess(data);
          }),
          takeUntil(this.actions$.pipe(ofType(AuthType.LOGGED_IN_USER_DETAILS_CANCEL))),
          catchError(({ error }) => of(showPrompt(error?.message)))
        );
      })
    );
  });
  _logout = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthType.LOGOUT),
      switchMap(() => {
        let message = '';
        this.store.dispatch(getLoggedInUser());
        this.store.select(selectLoggedInUser).subscribe((user: AuthModel) => {
          if (user !== AuthState.auth) {
            message = `Goodbye, ${user.name}`;
          }
        });
        return this.authService.logout().pipe(
          tap(() => {
            this.store.dispatch(showPrompt(message));
            this.router.navigate([`${urls.login}`]);
          }),
          catchError(({ error }) => of(showPrompt(error?.message)))
        );
      })
    );
  }, { dispatch: false });
}
