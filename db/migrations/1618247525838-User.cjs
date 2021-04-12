const { MigrationInterface, QueryRunner, Table } = require('typeorm');

module.exports = class User1618247525838 {

    async up(queryRunner) {
		await queryRunner.createTable(new Table({
			name: 'users',
			columns: [
				{
					name: 'id',
					type: 'varchar',
					isPrimary: true,
					generationStrategy: 'uuid'
				},
				{
					name: 'email',
					type: 'varchar'
				},
				{
					name: 'email_verified_at',
					type: 'timestamp',
					nullable: true
				},
				{
					name: 'first_name',
					type: 'varchar',
				},
				{
					name: 'last_name',
					type: 'varchar',
				},
				{
					name: 'password',
					type: 'varchar'
				}
			]
		}), true);
    }

    async down(queryRunner) {
    }
}
        