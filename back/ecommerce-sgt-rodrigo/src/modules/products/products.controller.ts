import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res, UseGuards, SetMetadata } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';
import { ID } from './entities/product.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @SetMetadata('isPublic', true)
  async create(@Body() createProductDto: CreateProductDto, @Res() res:Response) {
   try {
    const response = await this.productsService.create(createProductDto);
    return res.status(201).json(response.id)
    // return res.status(201).json({
    //   message: 'Product registered successfully',
    //   product: response
    // })
   } catch (error) {
    throw error
   }
  }

  @Get()
  async findAll(@Res() res: Response) {
  try {
     const response = await this.productsService.findAll();
     return res.status(200).json({
      message:'Products fetched succesfully', 
      allProducts: response
     })
  } catch (error) {
    
  }
  }

  @Get(':id')
  async findOne(@Param('id') id: ID, @Res() res: Response) {
    try {
      const response = await this.productsService.findOne(id);
      return res.status(200).json({
        message:'Product fetched succesfully',
        product: response
      })
    } catch (error) {
      throw error
    }
  }

  @Put(':id')
  async updatePut(@Param('id') id: string, 
                  @Body() updateProductDto: UpdateProductDto,
                  @Res() res:Response
                ) {
  try {
      const response = await this.productsService.updatePut(id, updateProductDto);
      return res.status(200).json(response.id)
  } catch (error) {
    throw error
  }
  }

  // @Patch(':id')
  // updatePatch(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: ID, @Res() res: Response) {
    try {
      const response = await this.productsService.remove(id);
      return res.status(200).json({
        message: 'Product deleted successfully',
        id: response.id
      })
    } catch (error) {
      throw error
    }
  }
}
