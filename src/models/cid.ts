import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'cids' })
export class Cid {
  @PrimaryColumn()
  id!: string;
  @Column()
  name!: string;
}
