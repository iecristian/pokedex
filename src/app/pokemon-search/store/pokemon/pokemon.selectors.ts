import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPokemon from './pokemon.reducer';

export const selectPokemonState = createFeatureSelector<fromPokemon.State>(
  fromPokemon.pokemonFeatureKey
);
