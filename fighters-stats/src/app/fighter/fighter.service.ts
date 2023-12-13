import { Injectable } from '@angular/core';
import { CategoryService } from '../category/category.service';

import { Fighter } from './fighter.model';
import {Observable, of} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class FighterService {

  fighters: Array<Fighter> = [
    new Fighter(1,"prenom1", "nom1", 30, 30.00, 30.00, 3.00, 1,0,'M', this.categoryService.getCategoryById(1)),
    new Fighter(2,"prenom2", "nom2", 30, 31.00, 31.00, 4.00, 2,1,'M', this.categoryService.getCategoryById(2)),
    new Fighter(3,"prenom3", "nom3", 30, 32.00, 32.00, 5.00, 3,2,'M', this.categoryService.getCategoryById(3)),
    new Fighter(4,"prenom4", "nom4", 30, 33.00, 33.00, 6.00, 4,3,'M', this.categoryService.getCategoryById(4)),
    new Fighter(5,"prenom5", "nom5", 30, 34.00, 34.00, 7.00, 5,4,'M', this.categoryService.getCategoryById(5)),
    new Fighter(6,"prenom6", "nom6", 30, 35.00, 35.00, 8.00, 6,5,'M', this.categoryService.getCategoryById(6)),
  ]
  constructor(private categoryService: CategoryService) {
  }

  getAllFighters(): Observable<Array<Fighter>>{
    return of(this.fighters)
  }

}
