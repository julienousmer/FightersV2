import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment/environment";


@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.post<{ access_token: string }>(environment.backendUrl + '/auth', {username, password})
      // .subscribe(res => {
      //   this.setSession(res.access_token);
      // });
  }

  private setSession(authToken: string) {
    localStorage.setItem('expires_at', (Date.now() + 60 * 60 * 1000).toString());
    localStorage.setItem('id_token', authToken);
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
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
