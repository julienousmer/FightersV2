import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IPhoto } from '@hero/shared';
import { Profil } from './profil.entity';

@Entity()
export class Photo implements IPhoto {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  url: string;

  @ManyToOne(() => Profil, (p) => p.photos, { lazy: true })
  @JoinColumn({ name: 'idProfil' })
  profil: Profil;

  @Column()
  idProfil: string;
}
