  import { DataSource, DataSourceOptions } from "typeorm";
  import {config as dotenvConfig} from 'dotenv';
  import { registerAs } from "@nestjs/config";
  import { TypeOrmModuleOptions } from "@nestjs/typeorm";

  // dotenvConfig({path:'.env.development'});
  dotenvConfig()

  const config: TypeOrmModuleOptions = {
    type: 'postgres',
    database: process.env.DB_NAME || 'default_db',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT as number | undefined,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.js,.ts}'],
  };

  export default registerAs('typeorm', ()=> config)
  export const connectionSource = new DataSource(config as DataSourceOptions)