import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createReservation1615412541536 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "reservation",
                columns:[
                    {
                        name:'id',
                        type: "varchar",
                        isPrimary: true
                    },{
                        name:"companion",
                        type:"int",
                        isNullable: false
                    },
                    {
                        name: "community_id",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "user_id",
                        type: "varchar",
                        isNullable: false
                    }
                ],
                foreignKeys:[
                    {
                        name: "FK_user",
                        referencedTableName: "user",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "FK_community",
                        referencedTableName: "community",
                        referencedColumnNames: ["id"],
                        columnNames: ["community_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("reservation")
    }

}
