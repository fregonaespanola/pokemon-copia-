import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {PokemonService} from "../app.service";
import {OAuthService, OAuthStorage} from "angular-oauth2-oidc";
import {googleAuthConfig} from "../auth.google.config";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  username: string = "";
  password: string = "";


  constructor(private http: HttpClient, private router: Router, private pokemonService: PokemonService, private oAuthService: OAuthService, private authStorage: OAuthStorage) {
  }


  login() {
    const credentials = {
      username: this.username,
      password: this.password
    };
    this.pokemonService.login(credentials)
      .subscribe(
        response => {
          localStorage.setItem('token', response.token)
          this.router.navigate(['/pokemon']);
        },
        error => {
          console.error('Error al iniciar sesión:', error);
        }
      );
  }

  async googleLogin() {

    // Tweak config for code flow
// confiure oauth2 service
    this.oAuthService.configure(googleAuthConfig);
    // manually configure a logout url, because googles discovery document does not provide it
    this.oAuthService.logoutUrl = "https://www.google.com/accounts/Logout";

    // loading the discovery document from google, which contains all relevant URL for
    // the OAuth flow, e.g. login url
    this.oAuthService.loadDiscoveryDocument().then(() => {
      // // This method just tries to parse the token(s) within the url when
      // // the auth-server redirects the user back to the web-app
      // // It doesn't send the user the the login page
      this.oAuthService.tryLoginImplicitFlow().then(() => {

        // when not logged in, redirecvt to google for login
        // else load user profile
        if (!this.oAuthService.hasValidAccessToken()) {
          this.oAuthService.initLoginFlow()
        } else {
          let token = this.authStorage.getItem('access_token');
          if (token) {
            this.pokemonService.googleLogin(token).subscribe(response => {
              localStorage.setItem('token', response.key)
              this.router.navigate(['/pokemon']);
            })
          }
        }

      })
    });

  }

}
