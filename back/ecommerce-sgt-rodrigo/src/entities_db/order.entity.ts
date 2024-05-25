import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn
  } from 'typeorm';
  import { Exclude } from 'class-transformer';
  
import { OrderDetail } from './order_detail.entity';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/modules/users/user.entity';
uuidv4();
  
  @Entity({
    name: 'orders'
  })
  export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();
  
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User; 
  
    @Column()
    date: Date;
    
    @Exclude()
    @OneToOne(() => OrderDetail)
    @JoinColumn()
    orderDetail: OrderDetail;

    @Column('decimal', { precision: 10, scale: 2 })
    total: number;
  }
  