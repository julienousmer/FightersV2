import {IFighter} from "./IFighter";

export interface ICategory {
  id: number;
  name: string;
  min_weight: number;
  max_weight: number;
  champion: IFighter | null;
  fighters: IFighter[] | null;
}
