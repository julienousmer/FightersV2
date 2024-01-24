import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EnumPuissancePouvoir, IPouvoir } from '@hero/shared';

@Entity()
export class Pouvoir implements IPouvoir {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  nom: string;
  @Column({ type: 'int' })
  puissance: EnumPuissancePouvoir;
}
