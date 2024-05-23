import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entities_db/product.entity';
import { Category } from 'src/entities_db/category.entity';
import { preloadData } from 'src/preloadData';



@Injectable()
export class ProductsDBService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getProducts() {
    return this.productsRepository.find();
  }

  async addProducts() {
    try {
        for (const productData of preloadData) {
            const exists = await this.productsRepository.findOne({ where: { name: productData.name } });
          if (!exists) {
            const category = await this.categoriesRepository.findOne({ where: { name: productData.category } });
            if (category) {
              const product = new Product();
              product.name = productData.name;
              product.description = productData.description;
              product.price = productData.price;
              product.stock = productData.stock;
              product.category_id = category;
              await this.productsRepository.save(product);
            }
          }
        }

        return 'Products Preloaded Succesfully'
    } catch (error) {
        throw new HttpException('Failed : Products Preload', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
