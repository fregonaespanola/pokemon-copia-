import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from "../app.service";

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemons: any[] = [];
  currentPage: number = 1; // Página actual, por defecto es 1

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentPage = +params['page'] || 1; // Obtener el parámetro 'page' de la URL, si no existe, usar 1 por defecto
      this.getPokemons(this.currentPage); // Obtener los pokemons de la página actual al inicializar el componente
    });
  }

  getPokemons(page: number): void {
    this.pokemonService.getPokemons(page) // Pasar el número de página al método getPokemons del servicio
      .subscribe(
        (response: any) => {
          if (response.results) {
            this.pokemons = response.results;
          } else {
            this.pokemons = response;
          }
        },
        (error) => {
          console.error('Error fetching pokemons:', error);
        }
      );
  }
}
