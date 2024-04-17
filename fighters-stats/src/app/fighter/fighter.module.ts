import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FightersComponent} from "./fighters/fighters.component";
import {DetailFighterComponent} from "./detail-fighter/detail-fighter.component";
import {EditFighterComponent} from "./edit/edit-fighter.component";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {FighterRoutingModule} from "./fighter-routing.module";

@NgModule({
  declarations: [
    FightersComponent,
    DetailFighterComponent,
    EditFighterComponent
  ],
  exports: [
    FightersComponent,
    DetailFighterComponent,
    EditFighterComponent
  ],
  imports: [
    CommonModule,
    FighterRoutingModule,
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class FighterModule { }

