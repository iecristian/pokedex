import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as PokemonActions from './pokemon.actions';
import { Pokemons, Pokemon } from 'src/app/models';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from 'src/app/services';



@Injectable()
export class PokemonEffects {

  constructor(private actions$: Actions, private http: HttpClient) {}

  /*loadPokemons$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.loadPokemons),
      concatMap(() =>
        this.http.get<Pokemon[]>('https://pokeapi.co/api/v2/pokemon').pipe(
          map((data: Pokemon[]) =>
            PokemonActions.loadPokemonsSuccess({pokemonsList: data })
          ),
          catchError(err =>
            of(PokemonActions.loadPokemonsFailure({ error: err }))
          )
      )
    ));
  });*/

  getPokemons$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonActions.getPokemons),
      concatMap(() =>
      this.http.get<Pokemon[]>('https://pokeapi.co/api/v2/pokemon').pipe(
        map((data: Pokemon[]) =>
          PokemonActions.getPokemonsSuccess({payload: data })
        ),
        catchError(err =>
          of(PokemonActions.loadPokemonsFailure({ error: err }))
        )
      )
    ));
  });

 /* public loadExchangeRates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExchangeRateActions.loadExchangeRates),
      concatMap(() =>
        this.http.get<any>('https://api.exchangeratesapi.io/latest').pipe(
          map(res =>
            ExchangeRateActions.loadExchangeRatesSuccess({ rates: res.rates })
          ),
          catchError(err =>
            of(ExchangeRateActions.loadExchangeRatesError({ rates: err }))
          )
        )))
  );*/
  


  

}
