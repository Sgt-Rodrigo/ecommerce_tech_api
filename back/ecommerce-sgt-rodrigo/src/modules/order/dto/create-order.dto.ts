import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";

export class OrderedProduct {
    id: string;
  }

export class CreateOrderDto {
    @IsNotEmpty({ message: 'User ID is required' })
    @IsUUID('all', { message: 'User ID must be a valid UUID' })
    user_id: string; 
  
    @IsArray({ message: 'At least one product is required' })
    @ArrayMinSize(1, { message: 'At least one product is required' }) 
  @ValidateNested({ each: true })
  @Type(() => OrderedProduct)
  products: OrderedProduct[];
  }
