import {Fighter} from "./fighter";

export interface Category {
  id: number;
  name: string;
  min_weight: number;
  max_weight: number;
  champion: Fighter | null;
}
