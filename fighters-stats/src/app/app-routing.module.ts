import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FightersComponent} from "./fighters/fighters.component";
import {FighterComponent} from "./fighter/fighter.component";

const routes: Routes = [
  {path: 'fighter/edit/:id', component: FighterComponent},
  {path: 'fighter/list', component: FightersComponent},
  {path: '', redirectTo: '/fighter/list', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
