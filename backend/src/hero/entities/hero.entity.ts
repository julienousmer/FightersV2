import { IHero } from '@hero/shared';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pouvoir } from './pouvoir.entity';
import { Profil } from './profil.entity';

@Entity()
export class Hero implements IHero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false })
  nom: string;

  @Column()
  score: number;

  @OneToOne(() => Profil)
  @JoinColumn({ name: 'id_profil', referencedColumnName: 'id' })
  profil: Profil;

  @ManyToMany(() => Pouvoir)
  @JoinTable({ name: 'hero_pouvoir' })
  pouvoirs: Pouvoir[];
}
