import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  database: 'datasus',
  username: 'datasus',
  password: process.env.DB_PASSWORD,
  synchronize: true,
});
