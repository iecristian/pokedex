import { Action, createReducer, on } from '@ngrx/store';
import * as LoginActions from './login.actions';
import { User } from '../../../models';

export const loginFeatureKey = 'login';

export interface LoginState {
  login: User;
}

export const initialState: LoginState = {
  login: {email: null, password: null}
};


export const loginReducer = createReducer(
  initialState,

  on(LoginActions.loadLogins, state => state),
  on(LoginActions.addLogin, (state, {newLogin}) => {
    return {
      ...state,
      login: {
        ...state.login

      }
    };
  }),
  on(LoginActions.loadLoginsSuccess, (state, action) => state),
  on(LoginActions.loadLoginsFailure, (state, action) => state),

);

export function reducer(state: LoginState | undefined, action: Action){
  return loginReducer(state, action);
}

