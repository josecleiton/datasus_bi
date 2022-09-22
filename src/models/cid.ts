import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'diagnostics' })
export class Cid {
  @PrimaryColumn()
  id!: string;
  @Column()
  name!: string;
}
