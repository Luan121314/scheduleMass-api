import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUser1615412244933 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns:[
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        isNullable: false
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user")
    }

}
