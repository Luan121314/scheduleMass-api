import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addCollunmPassword1615761102913 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("reservation",
        new TableColumn({
            name: "password",
            type: "varchar"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("reservation", "password")
    }

}
