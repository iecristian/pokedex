import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as LoginActions from './login.actions';



@Injectable()
export class LoginEffects {

  /*loadLogins$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(LoginActions.loadLogins),
      concatMap(() =>
        EMPTY.pipe(
          map(data => LoginActions.loadLoginsSuccess({ data })),
          catchError(error => of(LoginActions.loadLoginsFailure({ error }))))
      )
    );
  });*/



  constructor(private actions$: Actions) {}

}
