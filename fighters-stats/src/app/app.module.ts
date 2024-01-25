import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {UserModule} from "./user/user.module";
import {FighterModule} from "./fighter/fighter.module";
import {AuthModule} from "./auth/auth.module";
import {AuthInterceptor} from "../auth.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthRoutingModule} from "./auth/auth-routing.module";
import {FighterRoutingModule} from "./fighter/fighter-routing.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    AuthModule,
    FighterModule,
    AuthRoutingModule,
    FighterRoutingModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
