import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserGender} from "./enum/user-gender.enum";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ length: 100 })
    public name: string;

    @Column({ length: 100 })
    public surname: string;

    @Column({ unique: true })
    public email: string;

    @Column({ unique: true })
    public phone: string;

    @Column()
    public password: string;

    @Column({ type: 'enum', enum: UserGender, default: UserGender.Unknown })
    public gender: string;

    @Column({ })
    public address: string;

    @CreateDateColumn({
        name: 'created_at',
    })
    public createdAt: Date;

    @DeleteDateColumn({
        name: 'delete_at',
    })
    public deletedAt: Date;
}