import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthRoutingModule} from "./auth/auth-routing.module";
import {AuthService} from "./auth/auth.service";

const routes: Routes = [
  {
    path: 'fighter',
    loadChildren: () => import('./fighter/fighter-routing.module').then(m => m.FighterRoutingModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule),
  },
  {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthService],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
