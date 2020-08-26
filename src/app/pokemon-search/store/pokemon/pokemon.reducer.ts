import { Action, createReducer, on } from '@ngrx/store';
import * as PokemonActions from './pokemon.actions';

export const pokemonFeatureKey = 'pokemon';

export interface State {

}

export const initialState: State = {

};


export const reducer = createReducer(
  initialState,

  on(PokemonActions.loadPokemons, state => state),
  on(PokemonActions.loadPokemonsSuccess, (state, action) => state),
  on(PokemonActions.loadPokemonsFailure, (state, action) => state),

);

