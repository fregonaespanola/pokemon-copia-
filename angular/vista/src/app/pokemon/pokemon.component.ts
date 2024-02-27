import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../app.service";


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemons: any[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons()
      .subscribe(
        (pokemons: any[]) => {
          this.pokemons = pokemons;
        },
        (error) => {
          console.error('Error fetching pokemons:', error);
        }
      );
  }
}
