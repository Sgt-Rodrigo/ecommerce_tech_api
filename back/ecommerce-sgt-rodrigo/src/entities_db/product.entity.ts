import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Category } from "./category.entity";
import { OrderDetail } from "./order_detail.entity";
uuidv4();

@Entity({
  name: 'products'
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column('text', {nullable: false})
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column('int', {nullable: false})
  stock: number;

  @Column('text')
  imgUrl: string = 'default image';

  @ManyToOne(() => Category, category => category.products)
  category_id: Category;

  @ManyToMany(() => OrderDetail, orderDetail => orderDetail.products)
  @JoinTable()
  orderDetails: OrderDetail[];
}