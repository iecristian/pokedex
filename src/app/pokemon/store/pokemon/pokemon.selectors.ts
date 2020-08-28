import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPokemon from './pokemon.reducer';

export const selectPokemonState = createFeatureSelector<fromPokemon.PokemonState>(
  fromPokemon.pokemonFeatureKey
);

export const getPokemonsList = createSelector(
  selectPokemonState,
  (state: fromPokemon.PokemonState) => state.pokemons.list
);

export const getPokemonSelected = createSelector(
  selectPokemonState,
  (state: fromPokemon.PokemonState) => state.pokemons.selected
);