import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepositoryService } from './products.repository';
import { ID } from './entities/product.entity';

@Injectable()
export class ProductsService  {

  constructor( private readonly productRepo:ProductsRepositoryService) {}

  async create(createProductDto: CreateProductDto) {
  try {
      const response = await this.productRepo.create(createProductDto);
      return response
  } catch (error) {
    //w re-throw
    throw error
  }
  }

  async findAll() {
   try {
    const response = await this.productRepo.findAll();
    return response
   } catch (error) {
    throw error
   }
  }

  async findOne(id: ID) {
    try {
      const response = await this.productRepo.findOne(id);
      return response
    } catch (error) {
      throw error
    }
  }

  async updatePut(id: string, updateProductDto: UpdateProductDto) {
   try {
    const response = await this.productRepo.updatePut(id, updateProductDto);
    return response
   } catch (error) {
    throw error
   }
  }

  async remove(id:ID) {
   try {
    const response = await this.productRepo.remove(id);
    return response
   } catch (error) {
    throw error
   }
  }
}
