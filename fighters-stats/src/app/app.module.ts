import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FightersComponent } from './fighters/fighters.component';
import {ReactiveFormsModule} from "@angular/forms";
import { CategoryComponent } from './category/category.component';
import {EditFighterComponent} from "./fighter/edit/edit-fighter.component";
import { DetailFighterComponent } from './fighter/detail-fighter/detail-fighter.component';

@NgModule({
  declarations: [
    AppComponent,
    FightersComponent,
    EditFighterComponent,
    CategoryComponent,
    DetailFighterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
