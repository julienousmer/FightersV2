import {Category} from "../category/category.model";

export class Fighter {
  id: number;
  firstName: string;
  name: string;
  age: number;
  weight: number;
  height: number;
  reach: number;
  nbWin: number;
  nbLose: number;
  sexe: string;
  category: Category | null;


  constructor(id: number, firstName: string, name: string, age: number, weight: number, height: number, reach: number, nbWin: number, nbLose: number, sexe: string, category: Category | null) {
    this.id = id;
    this.firstName = firstName;
    this.name = name;
    this.age = age;
    this.weight = weight;
    this.height = height;
    this.reach = reach;
    this.nbWin = nbWin;
    this.nbLose = nbLose;
    this.sexe = sexe;
    this.category = category;
  }

}
