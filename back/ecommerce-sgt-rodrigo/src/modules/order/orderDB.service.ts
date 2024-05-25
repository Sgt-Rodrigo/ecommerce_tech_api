    import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
    import { CreateOrderDto } from './dto/create-order.dto';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Order } from 'src/entities_db/order.entity';
    import { User } from '../users/user.entity';
    import { MoreThan, Repository } from 'typeorm';
    import { Product } from 'src/entities_db/product.entity';
    import { OrderDetail } from 'src/entities_db/order_detail.entity';
    import { plainToClass } from 'class-transformer';

    @Injectable()
    export class OrderRepo {

        constructor(
            @InjectRepository(Order)
            private readonly orderRepository: Repository<Order>,
            @InjectRepository(User)
            private readonly userRepository: Repository<User>,
            @InjectRepository(Product)
            private readonly productRepository: Repository<Product>,
            @InjectRepository(OrderDetail)
            private readonly orderDetailRepository: Repository<OrderDetail>,
          ) {}
        

          async getOrderByID(orderId: string) {
            // Find the order with the given ID
            const order = await this.orderRepository.findOne({
              where: { id: orderId },
              relations: ['orderDetail', 'orderDetail.products', 'user', 'user.orders'],
            });
          
            // If order is not found, throw a NotFoundException
            if (!order) {
              throw new NotFoundException('Order not found');
            }
          
          // Extract the user and the orders array containing only id and date
          const user = order.user;
          const orders = user.orders.map(order => ({ id: order.id, date: order.date }));

          // Return the user with the orders array
          return { user, orders };
          }


        async addOrder(orderData: CreateOrderDto) {

           
           try {
             const { user_id, products } = orderData;
         
             //W  fetches user
             const user = await this.userRepository.findOne({ where: { id: user_id } });
             if (!user) {
               throw new NotFoundException('User not found');
             }
         
             //w creates order
             const order = new Order();
             order.user = user;
             order.date = new Date();
             order.total = 0;
         
             //w fetches products and creates detail
             const orderDetail = new OrderDetail();
             orderDetail.order = order;
             orderDetail.products = [];
             
             for (const { id } of products) {
               const product = await this.productRepository.findOne({ where: { id, stock: MoreThan(0) } });
               if (!product) {
                 throw new NotFoundException(`Product with id ${id} not found or out of stock`);
               }
         
               product.stock -= 1;
               await this.productRepository.save(product);
         
               // Add product price to order total and order detail price
      const productPrice = parseFloat(product.price.toString());
      order.total += productPrice;
      orderDetail.products.push(product);
      orderDetail.price += productPrice;
             }
         
             await this.orderRepository.save(order);
             orderDetail.order = order;
             await this.orderDetailRepository.save(orderDetail);
         
             order.orderDetail = orderDetail;

             // Transform the order object to a plain object before returning
    const plainOrder = plainToClass(Order, order, { excludeExtraneousValues: true });

    return plainOrder;

           } catch (error) {
            // throw new HttpException('Error adding order', HttpStatus.INTERNAL_SERVER_ERROR)
            throw error
           }
          }
        


    }