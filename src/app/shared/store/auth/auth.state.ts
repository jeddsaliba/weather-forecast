import { Auth, AuthModel } from './auth.model';

const AuthInitialState: AuthModel = {
  name: '',
  email: '',
  nickname: '',
  picture: '',
  url: ''
};

export const AuthState: Auth = {
  auth: AuthInitialState,
  authenticated: false
};
