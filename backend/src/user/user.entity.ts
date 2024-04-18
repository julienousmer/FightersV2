import { IUser } from '@models/shared';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User implements IUser {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'username', unique: true})
  username: string;

  @Column({name: 'password'})
  password: string;
}
