"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const _1685555091176_CreatingTables_1 = require("./migrations/1685555091176-CreatingTables");
(0, dotenv_1.config)({ path: './.env' });
const configService = new config_1.ConfigService();
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: `${configService.get('POSTGRES_PASSWORD')}`,
    database: configService.get('POSTGRES_DB'),
    entities: ['**/*.entity.ts'],
    migrations: [_1685555091176_CreatingTables_1.CreatingTables1685555091176],
    migrationsTableName: 'custom_migration_table',
});
//# sourceMappingURL=data-source.js.map