import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createCommunity1615402064234 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "community",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true

                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "capacity",
                        type: "int"
                    },
                    {
                        name: "address",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("community");
    }

}
