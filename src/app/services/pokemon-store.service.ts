import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PokemonActions from '../pokemon-search/store/pokemon/pokemon.actions';
import  { Pokemon, Pokemons} from '../models';

@Injectable({
  providedIn: 'root'
})
export class PokemonStoreService {

  constructor(private store: Store<Pokemons>) { }

  public loadPokemons(){
    this.store.dispatch(PokemonActions.loadPokemons());
  }

  public selectPokemon(pokemonId: number){
    this.store.dispatch(
      PokemonActions.selectPokemon({pokemonId})
    );
  }
}
