import { Body, Controller, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from 'src/entities_db/category.entity';
import { Product, preloadData } from 'src/preloadData';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('seeder')
  async seedCategories() {
    const categories = Array.from(new Set(preloadData.map(item => item.category))).map(name => ({ name }));
    await this.categoriesService.addCategories(categories);
  }
}

