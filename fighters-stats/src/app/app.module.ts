import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {FighterModule} from "./components/fighter/fighter.module";
import {AuthModule} from "./components/auth/auth.module";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthRoutingModule} from "./components/auth/auth-routing.module";
import {FighterRoutingModule} from "./components/fighter/fighter-routing.module";
import { ServiceWorkerModule } from '@angular/service-worker';
import {AppUpdateService} from "./services/sw-update.service";
import {OnlineStatusService} from "./services/online-status.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
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
