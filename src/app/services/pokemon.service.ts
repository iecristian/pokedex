import { Injectable } from '@angular/core';
import { Pokemon } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  searchPokemon(pokemon: Pokemon): Observable<any>{
    console.log('searchPokemon pokemon: ', pokemon);
    return this.http.get<any>('https://pokeapi.co/api/v2/pokemon' + '/'+ pokemon.name)
    .pipe(catchError(this.errorHandler));
  }

  listPokemon(limit: number): Observable<any>{
    return this.http.get<any>('https://pokeapi.co/api/v2/pokemon' + '?offset=1&limit=' + limit)
     .pipe(catchError(this.errorHandler));
  }

  pokemonInfo(url: string): Observable<any>{
    return this.http.get<any>(url)
    .pipe(catchError(this.errorHandler));
  }

  detailPokemon(id: number): Observable<any>{
    return this.http.get<any>('https://pokeapi.co/api/v2/pokemon/' + id)
    .pipe(catchError(this.errorHandler));
  }
  

  
  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}

