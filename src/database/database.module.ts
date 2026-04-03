import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entities/courses.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'devtraining',
    entities: [Course],
    synchronize: true
}

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => dataSourceOptions,
        }),
    ],
})
export class DatabaseModule {}
