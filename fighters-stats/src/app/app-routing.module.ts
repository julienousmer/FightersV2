import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationService} from "./services/authentication.service";

const routes: Routes = [
  {
    path: 'fighter',
    loadChildren: () => import('./components/fighter/fighter-routing.module').then(m => m.FighterRoutingModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth-routing.module').then(m => m.AuthRoutingModule),
  },
  {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthenticationService],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
