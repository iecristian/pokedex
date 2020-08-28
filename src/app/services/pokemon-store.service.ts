import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PokemonActions from '../pokemon/store/pokemon/pokemon.actions';
import * as PokemonSelectors from '../pokemon/store/pokemon/pokemon.selectors';
import  { Pokemon, Pokemons} from '../models';
import { Observable } from 'rxjs';

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

  public getPokemonList$(): Observable<Pokemon[]>{
    console.log('pokemon store getPokemonList');
    return this.store.select(PokemonSelectors.getPokemonsList);
  }

  public getSelectedPOkemon$(): Observable<Pokemon>{
    return this.store.select(PokemonSelectors.getPokemonSelected);
  }
}
