import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PokemonService} from "../app.service";
import {Router} from "@angular/router";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = "";
  password: string = "";
  password2: string = "";

  constructor(private http: HttpClient, private pokemonService: PokemonService, private router: Router, private toastr: ToastrService) {
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
          this.toastr.success('Usuario registrado con éxito');
          this.router.navigate(['/']);
        },
        error => {
          for (let field in error.error) {
            if (field != 'non_field_errors') {
              this.toastr.error(`${field}: ${error.error[field]}`);
            } else {
              this.toastr.error(`${error.error[field]}`);
            }
          }
        }
      );
  }
}
