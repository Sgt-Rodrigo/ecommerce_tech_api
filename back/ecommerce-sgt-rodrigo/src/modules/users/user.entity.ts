import { IsString, Length } from "class-validator";
import { Order } from "src/entities_db/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
uuidv4();

 
  @Entity({
    name: 'users'
  })
  export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();
  
    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string;
  
    @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
    email: string;
  
    @Column({ type: 'varchar', length: 150, nullable: false })
    password: string;
  
    @Column('int')
    phone: number;
  
    @Column({ type: 'varchar', length: 50 })
    country: string;
  
    @Column({ default: 'Unknown Address' })
    address: string;
  
    @Column({ type: 'varchar', length: 50 })
    city: string;

    @Column({default:false})
    isAdmin:boolean

    // @IsString()
    // @Length(5, 20)
    // role: string;
  
    @OneToMany(() => Order, order => order.user)
    orders: Order[];
  }