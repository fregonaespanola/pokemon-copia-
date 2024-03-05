import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PokemonComponent} from './pokemon/pokemon.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule} from "@angular/forms";
import {PokemonDetailComponent} from './pokemon-detail/pokemon-detail.component';
import {OAuthModule} from "angular-oauth2-oidc";
import {PokemonService} from "./app.service";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    LoginComponent,
    RegisterComponent,
    PokemonDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent,]
})
export class AppModule {
}
