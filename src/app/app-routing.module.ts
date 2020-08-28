import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards';
import { LoginComponent} from './login/login.component';
import { RegistrationComponent} from './registration/registration.component';
import { PokemonSearchComponent} from './pokemon-search/pokemon-search.component';
import { PokemonDetailComponent} from './pokemon-detail/pokemon-detail.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'search', component: PokemonSearchComponent, canActivate: [AuthGuard] },
  { path: 'details/:id', component: PokemonDetailComponent, canActivate: [AuthGuard] },
  { path: '', component: PokemonSearchComponent, canActivate: [AuthGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
