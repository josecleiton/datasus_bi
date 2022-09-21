import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  database: 'datasus',
  username: 'datasus',
  password: process.env.DB_PASSWORD,
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
});
