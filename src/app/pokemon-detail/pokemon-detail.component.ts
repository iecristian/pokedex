import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PokemonService } from '../services';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.sass']
})
export class PokemonDetailComponent implements OnInit {
  
  details: any;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;

    this.pokemonService.detailPokemon(this.id).subscribe(res => {
      console.log('res: ', res);
      console.log('res.id: ' , res.id);
      this.details = res;
      console.log(this.details);
      console.log(this.details.types);
     
      
    });
  }

}
