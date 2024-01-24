import {IFighter, ICategory} from '@models/shared'
import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {JoinColumn} from "typeorm";
import {Fighter} from "../../fighters/entities/fighter.entity";

@Entity()
export class Category implements ICategory {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Fighter)
    @JoinColumn({name: 'champion', referencedColumnName: 'id'})
    champion: Fighter;

    @Column({name: 'max_weight', nullable: false})
    max_weight: number;

    @Column({name: 'min_weight', nullable: false})
    min_weight: number;

    @Column({name : 'name', nullable: false})
    name: string;

    @OneToMany(() => Fighter, fighter=> fighter.category)
    @JoinColumn({name: 'champion', referencedColumnName: 'id'})
    fighters: Fighter[] | null;
}
