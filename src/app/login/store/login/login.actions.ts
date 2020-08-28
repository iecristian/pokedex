import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models';


export const loadLogins = createAction(
  '[Login] Load Logins'
);

export const loadLoginsSuccess = createAction(
  '[Login] Load Logins Success',
  props<{ Logins: User[] }>()
);

export const addLogin = createAction(
  '[Login] Add Login',
  props<{ newLogin: User }>()
);

export const setLogin = createAction(
  '[Login] Set Login',
  props<{ updatedLogin: User }>()
);

export const loadLoginsFailure = createAction(
  '[Login] Load Logins Failure',
  props<{ error: any }>()
);
