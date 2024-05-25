import { Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";
import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
uuidv4();

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number = 0;

  @Exclude()
  @OneToOne(() => Order, order => order.orderDetail)
  order: Order;

  @ManyToMany(() => Product, product => product.orderDetails)
  products: Product[];
}