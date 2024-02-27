import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {PokemonService} from "../app.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string="";
  password: string="";

  constructor(private http: HttpClient, private router: Router,private pokemonService:PokemonService) {}



  login() {
        const credentials = {
      username: this.username,
      password: this.password
    };
    this.pokemonService.login(credentials)
      .subscribe(
        response => {
          localStorage.setItem('token',response.token)
          this.router.navigate(['/pokemon']);
        },
        error => {
          console.error('Error al iniciar sesión:', error);
        }
      );
  }
}

