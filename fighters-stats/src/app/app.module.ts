import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FightersComponent } from './fighters/fighters.component';
import {ReactiveFormsModule} from "@angular/forms";
import { CategoryComponent } from './category/category.component';
import {FighterComponent} from "./fighter/fighter.component";

@NgModule({
  declarations: [
    AppComponent,
    FightersComponent,
    FighterComponent,
    CategoryComponent
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
