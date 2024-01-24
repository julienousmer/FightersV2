import { IUser } from '@models/shared';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
}