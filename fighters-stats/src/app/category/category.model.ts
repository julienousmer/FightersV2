import {Fighter} from '../fighter/fighter.model';

export class Category {
  _id: number;
  _name: string;
  _min_weight: number;
  _max_weight: number;
  _champion: Fighter | null;

  constructor(id: number, name: string, min_weight: number,
              max_weight: number, champion: Fighter | null = null) {
    this._id = id;
    this._name = name;
    this._min_weight = min_weight;
    this._max_weight = max_weight;
    this._champion = champion;
  }

  toString(): string {
    return this._name;
  }

}
