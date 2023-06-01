import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ProductService} from "./product.service";
import {Product} from "./product.entity";
import {CreateProduct} from "./dto/create-product.dto";

@Controller('product')
export class ProductController {
    constructor(private productService : ProductService) {}

    @Get()
    public async getAllProduct(): Promise<Product[]> {
        return await this.productService.getAllProducts();
    }

    @Get(':name')
    public async getProductByName(@Param('name') name: string): Promise<Product> {
        return await this.productService.getProductByName(name);
    }

    @Post()
    public async createProduct(
        @Body() createProductDto: CreateProduct,
    ): Promise<Product> {
        return await this.productService.createProduct(createProductDto);
    }

    @Delete('id')
    public async deleteProduct(@Param('id') id: string): Promise<Product> {
        return await this.productService.deleteProduct(id);
    }
}
