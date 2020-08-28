export interface Pokemon {
    id: number;
    //image: string;
    name: string;
    type: string;
    height: number;
    weight: number;
    //moves: string;
    //evolutionString: string;
}

export interface Pokemons {
    list: Pokemon[];
    selected: Pokemon;
  }