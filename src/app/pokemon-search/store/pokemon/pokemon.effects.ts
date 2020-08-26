import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as PokemonActions from './pokemon.actions';



@Injectable()
export class PokemonEffects {

  loadPokemons$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(PokemonActions.loadPokemons),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => PokemonActions.loadPokemonsSuccess({ data })),
          catchError(error => of(PokemonActions.loadPokemonsFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
