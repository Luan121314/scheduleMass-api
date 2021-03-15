import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addCollumnCreatedAtUser1615490493404 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("user", 
        new TableColumn({
            name: "created_at",
            type: "timestamp",
            default: "now()"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("user", "created_at");
    }

}
