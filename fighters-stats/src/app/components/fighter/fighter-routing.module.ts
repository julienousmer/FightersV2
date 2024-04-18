import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FightersComponent} from "./fighters/fighters.component";
import {FighterEditComponent} from "./fighter-edit/fighter-edit.component";

const routes: Routes = [
  {
    path: 'fighter',
    children: [
      {path: 'detail/:id', component: FighterEditComponent, pathMatch: 'full'},
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
