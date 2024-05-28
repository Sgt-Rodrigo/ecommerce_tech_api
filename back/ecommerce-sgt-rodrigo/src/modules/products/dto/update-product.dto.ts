import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { Category } from 'src/entities_db/category.entity';

export class UpdateProductDto {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryID: string;
    imageURL: string;
}
