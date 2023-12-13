import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DetailFighterComponent} from "./detail-fighter/detail-fighter.component";
import {FightersComponent} from "./fighters/fighters.component";
import {AuthGuard} from "../utils/auth/auth.guard";

const routes: Routes = [
  {
    path: 'fighter',
    children: [
      {path: 'edit/:id', component: DetailFighterComponent, pathMatch: 'full', canActivate:[AuthGuard]},
      {path: 'detail/:id', component: DetailFighterComponent, pathMatch: 'full'},
      {path: 'list', component: FightersComponent, pathMatch: 'full'},
      {redirectTo: 'list', path: '', pathMatch: 'full'}
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FighterRoutingModule {
}
