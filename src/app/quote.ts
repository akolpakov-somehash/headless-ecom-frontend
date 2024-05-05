export interface QuoteItem {
    productid: number;
    quantity: number;
}

export interface Quote {
    customerid: number;
    itemsList: QuoteItem[];
}
