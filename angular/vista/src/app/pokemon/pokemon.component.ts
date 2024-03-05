import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokemonService} from "../app.service";

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemons: any[] = [];
  currentPage: number = 0;
  hasNextPage = true;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(() => this.navigatePage('next'));
  }

  navigatePage(direction: 'next' | 'previous'): void {
    const newPage = direction === 'next' ? this.currentPage + 1 : this.currentPage - 1;
    if (newPage < 1) return;

    this.pokemonService.getPokemons(newPage).subscribe(
      response => {
        if (response.results && response.results.length > 0) {
          this.currentPage = newPage;
          this.pokemons = response.results;
          this.hasNextPage = response.next != null;
        }
      },
      error => console.error('Error fetching pokemons:', error)
    );
  }
}
