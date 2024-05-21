import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import axios from 'axios';

@Injectable()
export class ProductsRepositoryService {
    private readonly jsonServerURL = 'http://localhost:8000/products';

    async create(productData:CreateProductDto){
        try {
            const response = await axios.post(this.jsonServerURL, productData);
            return response.data
        } catch (error) {
            throw new HttpException('Error creating product', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
