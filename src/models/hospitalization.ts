import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { City } from './city';
import { Cid } from './cid';
import { HealthOrganization } from './health-organization';
import { Pacient } from './pacient';
import { Procedure } from './procedure';

@Entity({ name: 'hospitalizations' })
export class Hospitalization {
  @PrimaryColumn()
  id!: string;
  @Column('uuid')
  pacientId!: string;
  @Column()
  pacientCityId!: string;
  @Column()
  diagnosticId!: string;
  @Column()
  healthOrganizationId!: string;
  @Column()
  procedureId: string;
  @Column()
  amount!: number;
  @Column()
  dailyInternated!: number;
  @Column()
  date!: Date;
  @Column()
  dailyWithCompanion!: number;

  @ManyToOne(() => Pacient, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'pacient_id' })
  pacient!: Pacient;
  @ManyToOne(() => City, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'pacient_city_id' })
  pacientCity!: City;
  @ManyToOne(() => Cid, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'diagnostic_id' })
  diagnostic!: Cid;
  @ManyToOne(() => HealthOrganization, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'health_organization_id' })
  healthOrganization!: HealthOrganization;
  @ManyToOne(() => Procedure, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'procedure_id' })
  procedure!: Procedure;
}
