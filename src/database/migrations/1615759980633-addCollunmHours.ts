import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addCollunmHours1615759980633 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("community",
            new TableColumn({
                name: "time",
                type: "varchar"
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("community", "time")
    }

}
