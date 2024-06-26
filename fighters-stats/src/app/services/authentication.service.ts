import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../config/environment/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<{ access_token: string }>(environment.backendUrl + '/auth', {username, password})
  }

  setSession(authToken: string) {
    localStorage.setItem('expires_at', (Date.now() + 60 * 60 * 1000).toString());
    localStorage.setItem('id_token', authToken);
  }

  public isLoggedIn() {
    const token = localStorage.getItem('id_token');
    return (token !== null && token.length > 0 && Date.now() < this.getExpiration());
  }

  getExpiration(): number {
    const expiration = localStorage.getItem("expires_at") ?? "0";
    return Number.parseInt(expiration);
  }
}
