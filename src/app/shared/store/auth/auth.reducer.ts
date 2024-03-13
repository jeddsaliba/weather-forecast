import { createReducer, on } from '@ngrx/store';
import { getLoggedInUserSuccess, isAuthenticatedSuccess, loginSuccess } from './auth.action';
import { AuthState } from './auth.state';
import { urls } from 'src/app/lib/urls';
const _authReducer = createReducer(
  AuthState,
  on(loginSuccess, (state, {payload}) => {
    const user = payload.result.user;
    return {
      ...state,
      user
    };
  }),
  on(isAuthenticatedSuccess, (state, {payload}) => {
    return {
      ...state,
      authenticated: payload
    }
  }),
  on(getLoggedInUserSuccess, (state, {payload}) => {
    return {
      ...state,
      auth: {
        name: payload.name,
        email: payload.email,
        nickname: payload.nickname,
        picture: payload.picture,
        url: `${urls.github}/${payload.nickname}`
      }
    }
  })
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
