import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { Category } from 'src/entities_db/category.entity';

export class UpdateProductDto {
      /**
   * Unique identifier for the order, generated as a UUID
   * @example f4219523-2d0c-4534-b3c1-257d62fe674d
   */
     id: string;
     /**
   * Name of the product, must be a string
   * @example 'Printer HP'
   */
     name: string;
     /**
* Description of the product, must be a string
* @example 'This is a high-quality printer used for various purposes.'
*/
     description: string;
     /**
* Price of the product, must be a number
* @example 300
*/
     price: number;
     /**
* Stock quantity of the product, must be a number
* @example 150
*/
     stock: number;
      /**
* Category ID to which the product belongs, must be a string
* @example d06bfa7a-9bc9-462f-b7e5-046a14e54f04
*/
     categoryID: string;
      /**
* URL of the product image, must be a string
* @example http://example.com/product-image.jpg
*/
     imageURL: string = 'http://example.com/product-image.jpg';
}
