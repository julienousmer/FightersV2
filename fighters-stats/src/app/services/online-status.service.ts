import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineStatusService {
  private internalConnectionChanged = new Subject<boolean>();

  get connectionChanged(): Observable<boolean> {
    return this.internalConnectionChanged.asObservable();
  }

  get isOnline(): boolean {
    return window.navigator.onLine;
  }

  constructor() {
    window.addEventListener('online', () => {
      console.log('online');
      this.updateOnlineStatus();
    });
    window.addEventListener('offline', () => {
      console.log('offline');
      this.updateOnlineStatus();
    });
  }

  private updateOnlineStatus(): void {
    console.log('updateOnlineStatus');
    this.internalConnectionChanged.next(window.navigator.onLine);
  }
}
