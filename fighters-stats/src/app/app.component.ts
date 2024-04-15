import { Component } from '@angular/core';
import {AppUpdateService} from "../sw-update.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fighters-stats';

  constructor(private updates: AppUpdateService) {
  }
}
