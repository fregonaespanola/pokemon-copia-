import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PokemonService} from "../app.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = "";
  password: string = "";

  constructor(private http: HttpClient, private pokemonService: PokemonService) {
  }

  register() {
    const newUser = {
      username: this.username,
      password1: this.password,
      password2: this.password
    };
    this.pokemonService.register(newUser)
      .subscribe(
        response => {
          console.log('Usuario registrado con éxito:', response);
          // Handle the response appropriately, for example, redirecting the user to the login page
        },
        error => {
          console.error('Error al registrar usuario:', error);
          // Handle the error appropriately, for example, showing an error message to the user
        }
      );
  }
}
