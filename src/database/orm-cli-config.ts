import 'dotenv/config'
import { Course } from "../entities/courses.entity";
import { Tag } from "../entities/tags.entity";
import { DataSource, DataSourceOptions } from "typeorm";

const isDistBuild = __dirname.includes('dist');

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Course, Tag],
    synchronize: false
}

export const dataSource = new DataSource({
    ...dataSourceOptions,
    synchronize: false,
    migrations: [
        isDistBuild ? 'dist/migrations/*.js' : 'src/migrations/*.ts',
    ],
})
