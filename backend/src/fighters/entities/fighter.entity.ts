import {IFighter} from '@models/shared';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "../../categories/entities/category.entity";

@Entity()
export class Fighter implements IFighter {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'first_name', length: 50, nullable: false})
    firstname: string;

    @Column()
    lastname: string;

    @Column({name: 'age', nullable: false})
    age: number;

    @Column({name: 'height', nullable: false})
    height: number;

    @Column({name: 'nb_lose', nullable: false})
    nbLose: number;

    @Column({name: 'nb_win', nullable: false})
    nbWin: number;

    @Column({name: 'reach', nullable: false})
    reach: number;

    @Column({name: 'sexe', nullable: false})
    sexe: string;

    @Column({name: 'weight', nullable: false})
    weight: number;
    
    @ManyToOne(() => Category, category => category.fighters)
    category: Category | null;
}
