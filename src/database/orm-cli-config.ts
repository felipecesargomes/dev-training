import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.module";

const isDistBuild = __dirname.includes('dist');

export const dataSource = new DataSource({
    ...dataSourceOptions,
    synchronize: false,
    migrations: [
        isDistBuild ? 'dist/migrations/*.js' : 'src/migrations/*.ts',
    ],
})
