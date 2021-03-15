import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addCollumnCreatedAndUpdtaed1615492082024 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("reservation", [
            new TableColumn({
                name: "created_at",
                type: "timestamp",
                default: "now()"
            }),
            new TableColumn({
                name: "updated_at",
                type: "timestamp",
                default: "now()"
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("reservation", [
            new TableColumn({
                name: "created_at",
                type: "timestamp",
                default: "now()"
            }),
            new TableColumn({
                name: "updated_at",
                type: "timestamp",
                default: "now()"
            })
        ])
    }

}
