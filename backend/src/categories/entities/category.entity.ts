import {Fighter, ICategory} from '@models/shared'
import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {JoinColumn} from "typeorm/browser";

@Entity()
export class Category implements ICategory {
    @OneToOne(() => Fighter)
    @JoinColumn({name: 'champion', referencedColumnName: 'id'})
    champion: Fighter;
    @PrimaryGeneratedColumn()
    id: number;
    @Column({name: 'max_weight', nullable: false})
    max_weight: number;
    @Column({name: 'min_weight', nullable: false})
    min_weight: number;
    @Column({name : 'name', nullable: false})
    name: string;
}
