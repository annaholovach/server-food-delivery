import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { CreatingTables1685555091176 } from './migrations/1685555091176-CreatingTables';

config({ path: './.env' });

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: `${configService.get('POSTGRES_PASSWORD')}`,
  database: configService.get('POSTGRES_DB'),
  entities: ['**/*.entity.ts'],
  migrations: [CreatingTables1685555091176],
  migrationsTableName: 'custom_migration_table',
});
