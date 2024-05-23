import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepositoryService } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities_db/product.entity';
import { ProductsDBService } from './productsDB.service';
import { Category } from 'src/entities_db/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepositoryService, ProductsDBService]
})
export class ProductsModule {}
