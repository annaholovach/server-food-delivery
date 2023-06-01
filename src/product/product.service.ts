import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import {Product} from "./product.entity";
import {CreateProduct} from "./dto/create-product.dto";


@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product)  private productRepository: Repository<Product>) {}
    public async getAllProducts() {
        return await this.productRepository.find();
    }

    async getProductByName(name: string): Promise<Product> {
        return await this.productRepository.findOne({ where: { name } });
    }

    async createProduct(createProductDto: CreateProduct): Promise<Product> {
        const candidateProduct = await this.getProductByName(createProductDto.name);

        if (candidateProduct) {
            throw new HttpException(
                'This product already exist',
                HttpStatus.BAD_REQUEST,
            );
        }

        const product = await this.productRepository.create(createProductDto);
        await this.productRepository.save(product);
        return product;
    }

    async deleteProduct(id: string): Promise<Product> {
        const deleteProduct = await this.productRepository.findOne({
            where: { id },
        });

        return deleteProduct;
    }
}
