import { Category } from './Category';

export interface IFighter {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  weight: number;
  height: number;
  reach: number;
  nbWin: number;
  nbLose: number;
  sexe: string;
  category: Category | null;
}
