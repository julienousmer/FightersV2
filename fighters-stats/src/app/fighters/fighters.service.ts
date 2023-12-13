import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Fighter} from "../models/fighter";



@Injectable({
  providedIn: 'root'
})
export class FightersService {

  private fighters: Array<Fighter> = [
    {
      id: 1,
      firstname: "firstname1",
      lastname: "lastname1",
      age: 21,
      weight: 21,
      height: 21,
      reach: 21,
      nbWin: 21,
      nbLose: 21,
      sexe: 'M',
    },
    {
      id: 2,
      firstname: "firstname2",
      lastname: "lastname2",
      age: 21,
      weight: 21,
      height: 21,
      reach: 21,
      nbWin: 21,
      nbLose: 21,
      sexe: 'M',
    },
    {
      id: 3,
      firstname: "firstname3",
      lastname: "lastname3",
      age: 21,
      weight: 21,
      height: 21,
      reach: 21,
      nbWin: 21,
      nbLose: 21,
      sexe: 'M',
    },
    {
      id: 4,
      firstname: "firstname4",
      lastname: "lastname4",
      age: 21,
      weight: 21,
      height: 21,
      reach: 21,
      nbWin: 21,
      nbLose: 21,
      sexe: 'M',
    },
    {
      id: 5,
      firstname: "firstname5",
      lastname: "lastname5",
      age: 21,
      weight: 21,
      height: 21,
      reach: 21,
      nbWin: 21,
      nbLose: 21,
      sexe: 'M',
    },
    {
      id: 6,
      firstname: "firstname6",
      lastname: "lastname6",
      age: 21,
      weight: 21,
      height: 21,
      reach: 21,
      nbWin: 21,
      nbLose: 21,
      sexe: 'M',
    }
  ]
  constructor() {
  }

  getAllFighters(): Observable<Array<Fighter>>{
    return of(this.fighters)
  }

}
