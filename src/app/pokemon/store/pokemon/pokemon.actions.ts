import { createAction, props } from '@ngrx/store';
import { Pokemon } from 'src/app/models';

export const loadPokemons = createAction(
  '[Pokemon] Load Pokemons'
);

export const selectPokemon = createAction(
  '[Pokemon] Select Pokemons',
  props<{ pokemonId: number }>()
);

export const loadPokemonsSuccess = createAction(
  '[Pokemon] Load Pokemons Success',
  props<{ pokemonsList: Pokemon[] }>()
);

export const loadPokemonsFailure = createAction(
  '[Pokemon] Load Pokemons Failure',
  props<{ error: any }>()
);

export const getPokemons = createAction(
  '[Pokemon] Get Pokemons'
);

export const getPokemonsSuccess = createAction(
  '[Pokemon] Get Pokemons Success',
  props<{payload: Pokemon[]}>()
);

export const getPokemonFailed = createAction(
  '[Pokemon] Get Pokemons Failed',
  props<{payload: string}>()
);
