import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IFighter} from "@models/shared";

@Injectable({
  providedIn: 'root'
})
export class FighterService {

  constructor(private http: HttpClient) { }

  getFighters() {
    return this.http.get<IFighter[]>(`http://localhost:3000/fighters`);
  }
}
