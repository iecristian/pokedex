export interface Pokemon {
    id: number;
    //image: string;
    name: string;
    tipo: string;
    height: number;
    weight: number;
    //moves: string;
    //evolutionString: string;
}

export interface Pokemons {
    list: Pokemon[];
    selected: string;
  }