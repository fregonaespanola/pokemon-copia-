import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PokemonService} from "./app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vista';

  constructor(private http: HttpClient, private pokemonService: PokemonService, private router: Router) {
  }

  logout() {
    this.pokemonService.logout().subscribe(response => {
      this.router.navigate(['/']);
    })
  }
}
