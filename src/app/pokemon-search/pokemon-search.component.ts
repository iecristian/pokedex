import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PokemonService } from '../services';



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
  hasDetail = false;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      name: ['', Validators.required]
  });
    this.listPokemon();
    this.hasDetail = false;
  }

  searchPokemon(){
    console.log(this.searchForm.value.name);

    if (this.searchForm.valid) {
      console.log('search');
      this.pokemonService.searchPokemon(this.searchForm.value).subscribe(res => {
        console.log('res: ', res);
        console.log('res.name: ' + res.name);
        console.log(typeof(res));
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
      this.pokemonService.listPokemon(50).subscribe(res => {
        this.results = res.results;
      });
    }
  }

  listPokemon(){
    console.log('list: ' , this.searchForm.value);
    
    this.pokemonService.listPokemon(50).subscribe(res => {
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
