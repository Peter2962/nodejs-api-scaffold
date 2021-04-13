import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({name: 'users'})
export class User extends BaseEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	first_name: string;

	@Column()
	last_name: string;

	@Column()
	email: string;

	@Column()
	email_verified_at: string;

	@Column()
	password: string;

}