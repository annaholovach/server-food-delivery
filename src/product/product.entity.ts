import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ unique: true })
    public name: string;

    @Column({ length: 100 })
    public description: string;

    @Column({ type: 'float' })
    public price: number;

    @Column()
    public image: string;

    @Column()
    public quantity: number;

    @CreateDateColumn({
        name: 'created_at',
    })
    public createdAt: Date;

    @DeleteDateColumn({
        name: 'delete_at',
    })
    public deletedAt: Date;
}
