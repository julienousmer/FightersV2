import { Injectable } from '@angular/core';
import {Admin} from "../models/Admin";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private admins: Array<Admin> = [
    {
      id: 1,
      pseudo: "Borloo",
      password: "Borloo"
    },
    {
      id: 2,
      pseudo: "Smehou",
      password: "Smehou"
    },
    {
      id: 3,
      pseudo: "Blbcrv",
      password: "Blbcrv"
    },
    {
      id: 4,
      pseudo: "Svlmon",
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

  public isAdmin(pseudo: string, password: string): boolean{
    if (this.admins.find(f => f.pseudo === pseudo && f.password === password)){
      this.set_auth(true);
      return this.isAuth;
    }else{
      return this.isAuth;
    }
  }

}
