import { createAction, props } from '@ngrx/store';

export const loadPokemons = createAction(
  '[Pokemon] Load Pokemons'
);

export const selectPokemon = createAction(
  '[Pokemon] Select Pokemons',
  props<{ pokemonId: number }>()
);

export const loadPokemonsSuccess = createAction(
  '[Pokemon] Load Pokemons Success',
  props<{ data: any }>()
);

export const loadPokemonsFailure = createAction(
  '[Pokemon] Load Pokemons Failure',
  props<{ error: any }>()
);
