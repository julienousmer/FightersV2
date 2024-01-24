import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IProfil } from '@hero/shared';
import { Photo } from './photo.entity';

@Entity()
export class Profil implements IProfil {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  nom: string;

  @OneToMany(() => Photo, (p) => p.profil)
  @JoinColumn()
  photos: Photo[];
}
