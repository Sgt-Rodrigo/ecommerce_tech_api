import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
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
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
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
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
