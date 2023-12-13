import {Injectable} from '@angular/core';
import {Category} from "./category.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  CategoryList: Array<Category> = [
    new Category(1, 'Poids Mouches', 52, 57, null),
    new Category(2, 'Poids Coqs', 57, 61, null),
    new Category(3, 'Poids Plumes', 61, 66, null),
    new Category(4, 'Poids Légers', 66, 70, null),
    new Category(5, 'Poids Mi-Moyens', 70, 77, null),
    new Category(6, 'Poids Moyens', 77, 84, null),
    new Category(7, 'Poids Mi-Lourds', 84, 93, null),
    new Category(8, 'Poids Lourds', 93, 120, null),
    new Category(9, 'Poids Pailles', 48, 52, null),
    new Category(10, 'Poids Mouches', 52, 57, null),
    new Category(11, 'Poids Coqs', 57, 61, null),
    new Category(12, 'Poids Plumes', 61, 66, null),
  ];

  constructor() {
  }

  getAllCategories(): Observable<Array<Category>> {
    return of(this.CategoryList);
  }

  getCategoryById(id: number): Category {
    return <Category>this.CategoryList.find(category => category._id === id)
  }
}
