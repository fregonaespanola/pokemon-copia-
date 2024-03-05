import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PokemonService} from "../app.service";
import {OAuthService} from "angular-oauth2-oidc";
import {googleAuthConfig} from "../auth.google.config";
import {githubAuthConfig} from "../auth.github.config";

@Component({
  selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";

  constructor(private router: Router, private pokemonService: PokemonService) {
  }

  ngOnInit() {
    if (localStorage.getItem('provider') === 'github') {
      this.handleAuthCallback();
    } else if (localStorage.getItem('provider') === 'google') {
      this.handleAuthCallbackGoogle();
    }
  }

  login() {
    this.pokemonService.login({username: this.username, password: this.password})
      .subscribe(response => {
        localStorage.setItem('token', response.key)
        this.router.navigate(['/pokemon']);
      }, error => {
        console.error('Error al iniciar sesión:', error);
      });
  }

  googleLogin() {
    localStorage.setItem('provider', 'google');
    // @ts-ignore
    const authUrl = `${googleAuthConfig.issuer}?client_id=${googleAuthConfig.clientId}&redirect_uri=${encodeURIComponent(googleAuthConfig.redirectUri)}&scope=${encodeURIComponent(googleAuthConfig.scope)}&response_type=code`;
    window.location.href = authUrl;
  }


  githubLogin() {
    localStorage.setItem('provider', 'github');
    // @ts-ignore
    const authUrl = `${githubAuthConfig.issuer}?client_id=${githubAuthConfig.clientId}&redirect_uri=${encodeURIComponent(githubAuthConfig.redirectUri)}&scope=${encodeURIComponent(githubAuthConfig.scope)}`;
    window.location.href = authUrl;
  }

  handleAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      this.pokemonService.githubLogin(code).subscribe(response => {
        localStorage.setItem('token', response.key)
        this.router.navigate(['/pokemon']);
      });
    }
  }

  handleAuthCallbackGoogle() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      this.pokemonService.googleLogin(code).subscribe(response => {
        localStorage.setItem('token', response.key)
        this.router.navigate(['/pokemon']);
      });
    }
  }

}
