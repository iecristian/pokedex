import { createAction, props } from '@ngrx/store';
import { Login } from './login.model';

export const loadLogins = createAction(
  '[Login] Load Logins'
);

export const loadLoginsSuccess = createAction(
  '[Login] Load Logins Success',
  props<{ data: any }>()
);

export const addLogin = createAction(
  '[Login] Add Login',
  props<{ newLogin: Login }>()
);

export const setLogin = createAction(
  '[Login] Set Login',
  props<{ updatedLogin: Login }>()
);

export const loadLoginsFailure = createAction(
  '[Login] Load Logins Failure',
  props<{ error: any }>()
);
