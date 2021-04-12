import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity
export class User {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	first_name: string;

	@Column()
	last_name: string;

}