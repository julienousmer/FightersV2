import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IFighter} from "@models/shared";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FighterService {

  constructor(private http: HttpClient) { }

  getFighters(): Observable<IFighter[]> {
    return this.http.get<IFighter[]>(`http://localhost:3000/fighters`);
  }

  createFighter(fighter: IFighter): Observable<IFighter> {
    return this.http.post<IFighter>("http://localhost:3000/fighters", fighter);
  }

  updateFighter(id: string, fighter: IFighter): Observable<IFighter> {
    return this.http.patch<IFighter>(`http://localhost:3000/fighters/${id}`, fighter);
  }

  deleteFighter(id: string) {
    return this.http.delete(`http://localhost:3000/fighters/${id}`);
  }
}
