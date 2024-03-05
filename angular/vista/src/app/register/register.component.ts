import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PokemonService} from "../app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = "";
  password: string = "";
  password2: string = "";

  constructor(private http: HttpClient, private pokemonService: PokemonService, private router: Router) {
  }

  register() {
    const newUser = {
      username: this.username,
      password1: this.password,
      password2: this.password2
    };
    this.pokemonService.register(newUser)
      .subscribe(
        response => {
          console.log('Usuario registrado con éxito:', response);
          this.router.navigate(['/']);
        },
        error => {
          console.error('Error al registrar usuario:', error);
          // Handle the error appropriately, for example, showing an error message to the user
        }
      );
  }
}
