import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FightersComponent} from "./fighters/fighters.component";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {FighterRoutingModule} from "./fighter-routing.module";
import { FighterEditComponent } from './fighter-edit/fighter-edit.component';

@NgModule({
  declarations: [
    FightersComponent,
    FighterEditComponent
  ],
  exports: [
    FightersComponent,
  ],
  imports: [
    CommonModule,
    FighterRoutingModule,
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class FighterModule { }

