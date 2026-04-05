import type { MigrationInterface, QueryRunner } from "typeorm";
import { Table, TableForeignKey } from "typeorm";

export class CreateCoursesTagsTable1775256539519 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'courses_tags',
            columns: [
                {
                    name: 'coursesId',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'tagsId',
                    type: 'uuid',
                    isPrimary: true,
                }
            ]
        }));

        await queryRunner.createForeignKey('courses_tags', new TableForeignKey({
            columnNames: ['coursesId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'courses',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('courses_tags', new TableForeignKey({
            columnNames: ['tagsId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tags',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('courses_tags');
    }

}
