import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './pokemon/pokemon.component';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {PokemonDetailComponent} from "./pokemon-detail/pokemon-detail.component";

const routes: Routes = [
  {path: 'pokemon', component: PokemonComponent},
  {path: 'pokemon/:id', component: PokemonDetailComponent}, // Add this line
  {path:'',component:LoginComponent},
  {path:'register',component:RegisterComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
