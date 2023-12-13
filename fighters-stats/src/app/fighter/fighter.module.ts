import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FightersComponent} from "./fighters/fighters.component";
import {DetailFighterComponent} from "./detail-fighter/detail-fighter.component";
import {CategoryComponent} from "./category/category.component";
import {EditFighterComponent} from "./edit/edit-fighter.component";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {FighterRoutingModule} from "./fighter-routing.module";



@NgModule({
  declarations: [
    FightersComponent,
    DetailFighterComponent,
    CategoryComponent,
    EditFighterComponent
  ],
  exports: [
    FightersComponent,
    DetailFighterComponent,
    CategoryComponent,
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
