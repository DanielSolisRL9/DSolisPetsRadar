import { envs } from "src/config/envs";
import { DataSource, DataSourceOptions } from "typeorm";
import { FoundPet } from "./entities/foundPet.entity";
import { LostPet } from "./entities/lostPet.entity";


export const dataSourceOptions : DataSourceOptions = {
    host: envs.DB_HOST,
    type: 'postgres',
    port: envs.DB_PORT,
    database: envs.DB_NAME,
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    entities: [FoundPet, LostPet],
    synchronize: false,
    migrations: ["dist/core/db/migrations/*"]
}

export const dataSource = new DataSource(dataSourceOptions);