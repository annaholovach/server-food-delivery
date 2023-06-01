import { ProductService } from "./product.service";
import { Product } from "./product.entity";
import { CreateProduct } from "./dto/create-product.dto";
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    getAllProduct(): Promise<Product[]>;
    getProductByName(name: string): Promise<Product>;
    createProduct(createProductDto: CreateProduct): Promise<Product>;
    deleteProduct(id: string): Promise<Product>;
}
