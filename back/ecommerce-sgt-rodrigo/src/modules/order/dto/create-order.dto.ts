import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";

export class OrderedProduct {
   /**
   * Unique identifier for the product, must be a valid UUID
   * @example e68fa465-717a-4b9b-9439-7d01a0fb5a44
   */
    id: string;
  }

export class CreateOrderDto {
   /**
   * User ID associated with the order, must be a valid UUID
   * @example b5a6c433-77a0-4b99-a6db-f472f7a7e764
   */
    @IsNotEmpty({ message: 'User ID is required' })
    @IsUUID('all', { message: 'User ID must be a valid UUID' })
    user_id: string; 
  
    /**
   * List of ordered products, must contain at least one product
   * @example [{ "id": "bb8ebe58-4e49-46f3-8d26-00c40174afe0" }]
   */
    @ApiProperty({
      example: [{ "id": "e68fa465-717a-4b9b-9439-7d01a0fb5a44" }],
    })
    @IsArray({ message: 'At least one product is required' })
    @ArrayMinSize(1, { message: 'At least one product is required' }) 
  @ValidateNested({ each: true })
  @Type(() => OrderedProduct)
  products: OrderedProduct[];
  }
