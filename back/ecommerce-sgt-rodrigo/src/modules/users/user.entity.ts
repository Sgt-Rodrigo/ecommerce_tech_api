import { Order } from "src/entities_db/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
uuidv4();

 
  @Entity()
  export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();
  
    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string;
  
    @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
    email: string;
  
    @Column({ type: 'varchar', length: 20, nullable: false })
    password: string;
  
    @Column('int')
    phone: number;
  
    @Column({ type: 'varchar', length: 50 })
    country: string;
  
    @Column('text')
    address: string;
  
    @Column({ type: 'varchar', length: 50 })
    city: string;
  
    @OneToMany(() => Order, order => order.user)
    orders: Order[];
  }