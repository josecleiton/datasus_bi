import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from './enums/gender.enum';

@Entity({ name: 'pacients' })
export class Pacient {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ enum: Gender })
  gender!: Gender;
  @Column({ type: 'smallint' })
  age!: number;
  @Column()
  isDead: boolean;
  @Column()
  nationality: string;
  @Column()
  childCount!: number;
  @Column()
  ethnic!: string;
  @Column()
  role!: string;
  @Column()
  educationLevel!: string;
}
