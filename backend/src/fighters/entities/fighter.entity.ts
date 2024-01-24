import {IFighter} from '@models/shared';
import {Entity} from "typeorm";

@Entity()
export class Fighter implements IFighter {

    age: number;
    firstname: string;
    height: number;
    id: number;
    lastname: string;
    nbLose: number;
    nbWin: number;
    reach: number;
    sexe: string;
    weight: number;
    category: Category | null;
}
