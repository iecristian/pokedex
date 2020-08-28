import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLogin from './login.reducer';

export const selectLoginState = createFeatureSelector<fromLogin.LoginState>(
  fromLogin.loginFeatureKey
);

export const getLogin = createSelector(
  selectLoginState,
  (state: fromLogin.LoginState) => state.login
);

export const getEmail = createSelector(
  selectLoginState,
  (state: fromLogin.LoginState) => state.login.email
);

export const getPassword = createSelector(
  selectLoginState,
  (state: fromLogin.LoginState) => state.login.password
);



