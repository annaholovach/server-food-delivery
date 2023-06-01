import { Repository } from 'typeorm';
import { Product } from "./product.entity";
import { CreateProduct } from "./dto/create-product.dto";
export declare class ProductService {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    getAllProducts(): Promise<Product[]>;
    getProductByName(name: string): Promise<Product>;
    createProduct(createProductDto: CreateProduct): Promise<Product>;
    deleteProduct(id: string): Promise<Product>;
}
