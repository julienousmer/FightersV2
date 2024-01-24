import {IFighter} from "./IFighter";

export interface Category {
  id: number;
  name: string;
  min_weight: number;
  max_weight: number;
  champion: IFighter | null;
}
