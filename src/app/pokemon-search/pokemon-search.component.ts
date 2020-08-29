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
  localPokemonList: any;
  recordsNumber: number;
  total: number;
  page: number;
  min: number;
  max: number;
  pages: number;
  
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
      count: ['']
  });
    this.listPokemon();
    if (localStorage.getItem('pokemonList')){
      console.log('pokemonList');
      this.localPokemonList = JSON.parse(localStorage.getItem('pokemonList'));
      console.log(this.localPokemonList[0]);
      this.recordsNumber = localStorage.getItem('records') ? JSON.parse(localStorage.getItem('records')) : 50;
      this.searchForm.controls.count.setValue(this.recordsNumber);
      this.results = this.localPokemonList.slice(1, this.recordsNumber);
    }
    this.total = localStorage.getItem('total') ? JSON.parse(localStorage.getItem('total')) : 50;
    this.page = 1;
    console.log('total: ', this.total);
    console.log('recordsNumber: ', this.recordsNumber);
    this.min = 1;
    this.max = typeof(this.recordsNumber) === 'string' ? 
                this.min + parseInt(this.recordsNumber, 10) + 1 : 
                this.min + this.recordsNumber + 1;
    this.pages = this.total / this.recordsNumber;
    console.log('pages: ', this.pages);
    this.hasDetail = false;
  }

  searchPokemon(){
    console.log(this.searchForm.value.name);
    this.min = this.page * this.recordsNumber;
    this.recordsNumber =  this.searchForm.controls.count.value;
    this.max = typeof(this.recordsNumber) === 'string' ?
                this.min + parseInt(this.recordsNumber, 10) + 1 :
                this.min + this.recordsNumber + 1;
    console.log('max: ', this.max);
    console.log('records: ', this.recordsNumber);
    if (this.recordsNumber === 0){
      this.max = this.total;
    }
    
    console.log('pages: ', this.pages);
    
    localStorage.setItem('records', this.recordsNumber.toString());
    if (this.searchForm.valid) {

      /*const regex = new RegExp('/contact\\b', 'g');
const matchedSites = sites.links.filter(({href}) => href.match(regex));
console.log(matchedSites);*/
    const regexString = this.searchForm.controls.name.value;
    console.log('regexString', regexString);
    const searchRegex = new RegExp(regexString);
    console.log('searchRegex', searchRegex);
    const searchResult = this.localPokemonList.filter(pok => searchRegex.test(pok.name));
    console.log('searchResult', searchResult);
    console.log('type: ', typeof(searchResult));
    console.log('size: ', searchResult.length);
    if(this.max > searchResult.length){
      this.min = 0;
      this.max = searchResult.length;
    }
    this.pages = searchResult.length < this.recordsNumber ?
        1 : searchResult.length / this.recordsNumber;
    this.results = searchResult.slice(this.min, this.max);
    console.log('this.results valid: ', this.results);
    }else{
      this.results = this.localPokemonList.slice(this.min, this.max);
      console.log('this.results NO valid: ', this.results);
    }
    
    /*if (this.searchForm.valid) {
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


    }*/
  }

  listPokemon(){
    /*console.log('list: ' , this.searchForm.value);
    this.results = this.pokemonStoreService.getPokemonList$();
    console.log('this.results' + this.results);
    console.log('this.results[]' + this.results[0]);*/
    if (!localStorage.getItem('pokemonList')){
      this.pokemonService.listPokemon(this.recordsNumber).subscribe(initialPoks => {
        console.log(initialPoks);
        this.results = initialPoks.results;
        console.log('results: ', this.results);
        this.total = initialPoks.count;
        localStorage.setItem('total', this.total.toString());
        this.pokemonService.listPokemon(this.total).subscribe(res => {
          localStorage.setItem('pokemonList', JSON.stringify(res.results));
        });
      });
    }
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

  nextPage(){
    console.log('nextPage min: ' , this.min);
    this.page ++;
    this.searchPokemon();
  }

  previousPage(){
    this.page --;
    if (this.page < 1){
      this.page = 1;
    }
    this.searchPokemon();
  }


}
