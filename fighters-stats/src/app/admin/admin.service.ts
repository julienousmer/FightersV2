import { Injectable } from '@angular/core';
import {IUser} from "@models/shared";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private admins: Array<IUser> = [
    {
      id: 1,
      username: "Borloo",
      password: "Borloo"
    },
    {
      id: 2,
      username: "Smehou",
      password: "Smehou"
    },
    {
      id: 3,
      username: "Blbcrv",
      password: "Blbcrv"
    },
    {
      id: 4,
      username: "Svlmon",
      password: "Svlmon"
    },
  ]
  private isAuth: boolean = false;

  constructor() { }

  public get_auth(): boolean{
    return this.isAuth;
  }

  private set_auth(auth: boolean){
    this.isAuth = auth;
  }

  public isAdmin(username: string, password: string): boolean{
    if (this.admins.find(f => f.username === username && f.password === password)){
      this.set_auth(true);
      return this.isAuth;
    }else{
      return this.isAuth;
    }
  }

}
