import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { City } from './models/city';
import { Cid } from './models/cid';
import { HealthOrganization } from './models/health-organization';
import { Pacient } from './models/pacient';
import { Hospitalization } from './models/hospitalization';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  database: 'datasus',
  username: 'datasus',
  password: process.env.DB_PASSWORD,
  entities: [City, Cid, HealthOrganization, Pacient, Hospitalization],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
});
