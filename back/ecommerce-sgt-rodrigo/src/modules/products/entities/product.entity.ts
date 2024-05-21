export class Product {
    id: string | number;
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryID: string;
    imageURL: string;

}

export type ID = Pick<Product, 'id'>