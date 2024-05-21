import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepositoryService } from './products.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepositoryService],
})
export class ProductsModule {}
