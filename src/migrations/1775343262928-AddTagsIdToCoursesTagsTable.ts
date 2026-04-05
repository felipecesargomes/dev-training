import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddTagsIdToCoursesTagsTable1775343262928 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'courses_tags',
            new TableColumn({
                name: 'tagsId',
                type: 'uuid',
                isNullable: true
            })
        );

        await queryRunner.createForeignKey('courses_tags', new TableForeignKey({
            name: 'courses_tags_tags',
            columnNames: ['tagsId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tags',
            onDelete: 'SET NULL'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
