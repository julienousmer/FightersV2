import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Fighter} from "../../models/fighter";
import {CategoryService} from "../category/category.service";



@Injectable({
  providedIn: 'root'
})
export class FightersService {

  private fighters: Array<Fighter> = [
    {
      id: 1,
      firstname: "Aalon",
      lastname: "Cruz",
      age: 34,
      weight: 65,
      height: 198,
      reach: 198,
      nbWin: 0,
      nbLose: 2,
      sexe: 'M',
      category: this.categoryService.getCategoryById(6),
    },
    {
      id: 2,
      firstname: "Abubakar",
      lastname: "Nurmagomedov",
      age: 34,
      weight: 77,
      height: 180,
      reach: 185,
      nbWin: 2,
      nbLose: 0,
      sexe: 'M',
      category: this.categoryService.getCategoryById(6),

    },
    {
      id: 3,
      firstname: "Alexandre",
      lastname: "Pantoja",
      age: 33,
      weight: 56,
      height: 165,
      reach: 170,
      nbWin: 10,
      nbLose: 3,
      sexe: 'M',
      category: this.categoryService.getCategoryById(6),

    },
    {
      id: 4,
      firstname: "Islam",
      lastname: "Makhachev",
      age: 32,
      weight: 70,
      height: 178,
      reach: 179,
      nbWin: 14,
      nbLose: 1,
      sexe: 'M',
      category: this.categoryService.getCategoryById(6),
    },
    {
      id: 5,
      firstname: "Jon",
      lastname: "Jones",
      age: 36,
      weight: 120,
      height: 193,
      reach: 215,
      nbWin: 21,
      nbLose: 1,
      sexe: 'M',
      category: this.categoryService.getCategoryById(6),

    },
    {
      id: 6,
      firstname: "Alex",
      lastname: "Pereira",
      age: 36,
      weight: 92,
      height: 194,
      reach: 201,
      nbWin: 6,
      nbLose: 1,
      sexe: 'M',
      category: this.categoryService.getCategoryById(6),

    }
  ]
  constructor(private categoryService: CategoryService) {
  }

  getAllFighters(): Observable<Array<Fighter>>{
    return of(this.fighters)
  }

  getById(id: number): Observable<Fighter|undefined>{
    return of(this.fighters.find(f => f.id === id))
  }

}