import { Injectable } from '@angular/core';
import {SwUpdate} from "@angular/service-worker";

@Injectable({
  providedIn: 'root'
})
export class AppUpdateService {

  constructor(private readonly updates: SwUpdate) {
    this.updates.available.subscribe(event => {
      this.showAppUpdateAlert();
    })
  }

  showAppUpdateAlert(){
    if (confirm('Une mise à jour est disponible, la faire tout de suite ?')){
      this.doAppUpdate();
    }
  }

  doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
