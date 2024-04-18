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

  constructor() {
    window.addEventListener('online', () => {
      this.updateOnlineStatus();
    });
    window.addEventListener('offline', () => {
      this.updateOnlineStatus();
    });
  }

  private updateOnlineStatus(): void {
    this.internalConnectionChanged.next(window.navigator.onLine);
  }
}
