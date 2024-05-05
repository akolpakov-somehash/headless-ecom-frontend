import { Injectable } from '@angular/core';
import { ProductTile } from './product-tile';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'http://localhost:3000/products';

  async getAllProducts(): Promise<ProductTile[]> {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // This extracts the JSON body content
      const productsArray: ProductTile[] = Object.values(data);
      // console.log('Products:', productsArray);
      return productsArray;
    } catch (error) {
      console.error('Failed to load all products:', error);
      return []; // Return an empty array on error
    }
  }

  async getProductById(id: number): Promise<ProductTile | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  constructor() { }
}
