export interface ProductTile {
    id: number;
    name: string;
    image: string;
    price: number;
    description: string;
}

export interface ProductQuote {
    product: ProductTile;
    quantity: number;
}