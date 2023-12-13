import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FightersComponent} from "./fighters/fighters.component";
import {DetailFighterComponent} from "./fighter/detail-fighter/detail-fighter.component";

const routes: Routes = [
  {path: 'fighter/detail/:id', component: DetailFighterComponent},
  {path: 'fighter/list', component: FightersComponent},
  {path: '', redirectTo: '/fighter/list', pathMatch: 'full'},
  {path: 'fighter/edit/:id', component: DetailFighterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
