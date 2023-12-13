import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FightersComponent} from './fighter/fighters/fighters.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CategoryComponent} from './fighter/category/category.component';
import {EditFighterComponent} from "./fighter/edit/edit-fighter.component";
import {DetailFighterComponent} from './fighter/detail-fighter/detail-fighter.component';
import {FighterRoutingModule} from "./fighter/fighter-routing.module";
import { AdminComponent } from './admin/admin.component';
import {AdminRoutingModule} from "./admin/admin-routing.module";
import {AdminModule} from "./admin/admin.module";
import {FighterModule} from "./fighter/fighter.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AdminModule,
    FighterModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
