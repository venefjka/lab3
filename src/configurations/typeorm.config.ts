import { DataSource } from 'typeorm';

const ormConfig: DataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  database: 'catalog',
  username: 'postgres',
  password: '3639',
  entities: ['dist/**/*.entity{.ts,.js}'],
  logging: true,
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/*{.ts,.js}'],
});
export default ormConfig;
