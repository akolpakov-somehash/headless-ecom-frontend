import { Injectable } from '@angular/core';
import { Quote } from './quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  url = 'http://localhost:3000/';

  async addProduct(id: number, qty: number): Promise<Quote> {
    try {
      const response = await fetch(`${this.url}add-product/${id}/${qty}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // This extracts the JSON body content
      const quote: Quote = data as Quote;
      return quote;
    } catch (error) {
      console.error('Failed to add product:', error);
      return { customerid: 0, itemsList: [] }; // Return an empty quote on error
    }
  }

  async getQuote(): Promise<Quote> {
    try {
      const response = await fetch(`${this.url}quote`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // This extracts the JSON body content
      console.log('Quote:', data);
      const quote: Quote = data as Quote;
      return quote;
    } catch (error) {
      console.error('Failed to load quote:', error);
      return { customerid: 0, itemsList: [] }; // Return an empty quote on error
    }
  }

  constructor() { }
}
