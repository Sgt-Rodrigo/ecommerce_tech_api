export type OrderedProduct = {
    id: string
}

export class CreateOrderDto {
    user_id: string;
    products: OrderedProduct[]
}
