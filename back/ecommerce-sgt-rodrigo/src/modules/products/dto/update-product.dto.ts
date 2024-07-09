import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { Category } from 'src/entities_db/category.entity';
import { IsNumber, IsString, IsUrl, IsUUID, MaxLength } from 'class-validator';

export class UpdateProductDto {
  /**
   * Unique identifier for the order, generated as a UUID
   * @example 5f92b783-aa31-446a-a47c-c3dbf85a6efc
   */
  @IsUUID()
  id: string;
  /**
   * Name of the product, must be a string
   * @example 'Motorola Edge 50'
   */
  @IsString()
  @MaxLength(50)
  name: string;
  /**
   * Description of the product, must be a string
   * @example 'This is a high-quality Motorola used for various purposes.'
   */
  @IsString()
  @MaxLength(500)
  description: string;
  /**
   * Price of the product, must be a number
   * @example 300
   */
  @IsNumber()
  price: number;
  /**
   * Stock quantity of the product, must be a number
   * @example 150
   */
  @IsNumber()
  stock: number;
  /**
   * Category ID to which the product belongs, must be a string
   * @example a85f8c2d-b605-4a3b-87f4-9ef6a6f3ac4d
   */

  @IsUUID()
  categoryID: string;
  /**
   * URL of the product image, must be a string
   * @example http://example.com/product-image.jpg
   */
  @IsUrl()
  imageURL: string;
}
