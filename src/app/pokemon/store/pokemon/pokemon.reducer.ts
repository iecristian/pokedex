import { Action, createReducer, on } from '@ngrx/store';
import * as PokemonActions from './pokemon.actions';
import { Pokemon, Pokemons } from 'src/app/models';

export const pokemonFeatureKey = 'pokemon';

export interface PokemonState {
  pokemon: Pokemon;
  pokemons: Pokemons;
}

export const initialState: PokemonState = {
  pokemons: { list: [], selected: null},
  pokemon: {id: null, name: null, type: null, height: null, weight: null}
};


export const pokemonReducer = createReducer(
  initialState,

  on(PokemonActions.loadPokemons, state => state),
  on(PokemonActions.selectPokemon, (state, {pokemonId}) => {
    return{
      ...state,
      id: state.pokemon.id, pokemonId
    };
  }),
  on(PokemonActions.loadPokemonsSuccess, (state, action) => state),
  on(PokemonActions.loadPokemonsFailure, (state, action) => state),

);

export function reducer(state: PokemonState | undefined, action: Action){
  return pokemonReducer(state, action);
}

