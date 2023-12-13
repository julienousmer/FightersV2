import {AdminComponent} from "./admin.component";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {FighterModule} from "../fighter/fighter.module";
import {AdminRoutingModule} from "./admin-routing.module";


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule { }
