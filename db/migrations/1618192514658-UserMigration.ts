import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class UserMigration1618192514658 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.createTable(new Table({
    		name: 'users'
    	}), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}