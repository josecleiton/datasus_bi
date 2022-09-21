import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { City } from './city';
import { Diagnostic } from './diagnostic';
import { HealthOrganization } from './health-organization';
import { Pacient } from './pacient';
import { Procedure } from './procedure';

@Entity({ name: 'hospitalizations' })
export class Hospitalization {
  @PrimaryColumn()
  id!: string;
  @Column()
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
  @JoinColumn({ referencedColumnName: 'pacient_id' })
  pacient!: Pacient;
  @ManyToOne(() => City, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'pacient_id' })
  pacientCity!: City;
  @ManyToOne(() => Diagnostic, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'diagnostic_id' })
  diagnostic!: Diagnostic;
  @ManyToOne(() => HealthOrganization, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'health_organization_id' })
  healthOrganization!: HealthOrganization;
  @ManyToOne(() => Procedure, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'procedure_id' })
  procedure!: Procedure;
}
