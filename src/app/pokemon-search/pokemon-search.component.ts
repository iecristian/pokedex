import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PokemonService, PokemonStoreService } from '../services';
import { Pokemon } from '../models';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.sass']
})
export class PokemonSearchComponent implements OnInit {

  searchForm: FormGroup;
  private formSubmitAttempt: boolean;
  public message: string;
  multipleResults = false;
   results: any;
  //results: Observable<Pokemon[]>;
  //results: Pokemon[];
  hasDetail = false;
  public pokemonList$: Observable<Pokemon[]>;
  public pokemonSelected$: Observable<Pokemon>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private pokemonService: PokemonService,
    private pokemonStoreService: PokemonStoreService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      name: ['', Validators.required],
      count:['']
  });
    this.listPokemon();
    this.hasDetail = false;
  }

  searchPokemon(){
    console.log(this.searchForm.value.name);

    const records =  this.searchForm.get('count').value;
    if (records){
      localStorage.setItem('records', records);
    }

    if (this.searchForm.valid) {
     
      this.pokemonService.searchPokemon(this.searchForm.value).subscribe(res => {
        if (typeof(res) === 'object'){
          this.results = [];
          this.results.push(res);
          console.log('results: ', this.results);
        }else{
          this.results = res;
        }
      });
    }else{
      console.log('else');
      let records = JSON.parse(localStorage.getItem('records'));
      if (!records){
        records = 50;
      }
      this.pokemonService.listPokemon(records).subscribe(res => {
        console.log('res', res);
        this.results = res.results;
      });


    }
  }

  listPokemon(){
    /*console.log('list: ' , this.searchForm.value);
    this.results = this.pokemonStoreService.getPokemonList$();
    console.log('this.results' + this.results);
    console.log('this.results[]' + this.results[0]);*/
    
    let records = JSON.parse(localStorage.getItem('records'));
    if (!records){
      records = 1048;
    }
    this.pokemonService.listPokemon(records).subscribe(res => {
      this.results = res.results;
      console.log('results: ', this.results);
      });
  }

  detailPokemon(url: string){

      console.log('url: ', url);
      this.pokemonService.pokemonInfo(url).subscribe(res => {
        console.log('res: ', res);
        console.log('res.id: ' , res.id);
        console.log('res.results: ' , res.results);
        console.log(typeof(res));
        this.router.navigate(['/details', res.id]);

        this.results = res.results;
      });
  }

  detailPokemonId(id: number){
    this.router.navigate(['/details', id]);
    console.log('id: ', id);
}


}
