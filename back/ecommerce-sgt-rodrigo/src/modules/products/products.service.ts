import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepositoryService } from './products.repository';

@Injectable()
export class ProductsService  {

  constructor( private readonly productRepo:ProductsRepositoryService) {}

  async create(createProductDto: CreateProductDto) {
  try {
      const response = await this.productRepo.create(createProductDto);
      return response
  } catch (error) {
    throw error
  }
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
