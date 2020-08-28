import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import * as PokemonReducer from '../pokemon/store/pokemon/pokemon.reducer';
import { PokemonSearchComponent } from '../pokemon-search/pokemon-search.component';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import { PokemonService, ApiService } from '../services';
import { EffectsModule } from '@ngrx/effects';
import { PokemonEffects } from './store/pokemon/pokemon.effects';


@NgModule({
  declarations: [
    PokemonSearchComponent,
    PokemonDetailComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      PokemonReducer.pokemonFeatureKey,
      PokemonReducer.reducer
    ),
    EffectsModule.forFeature([PokemonEffects])
  ],
  exports: [
    PokemonSearchComponent,
    PokemonDetailComponent
  ],
  providers: [PokemonService, ApiService],
})
export class PokemonModule { }
