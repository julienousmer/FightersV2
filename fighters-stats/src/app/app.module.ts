import {NgModule, isDevMode} from '@angular/core';
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
import { ServiceWorkerModule } from '@angular/service-worker';
import {AppUpdateService} from "../sw-update.service";
import {OnlineStatusService} from "../online-status.service";

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
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    OnlineStatusService,
    AppUpdateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
