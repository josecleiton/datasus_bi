import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'health_organizations' })
export class HealthOrganization {
  @PrimaryColumn()
  id!: string;
  @Column()
  document!: string;
}
