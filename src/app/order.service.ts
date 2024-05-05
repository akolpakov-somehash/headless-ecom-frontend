import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url = 'http://localhost:3000/';

  constructor() {}

  async *streamOrders(customerId: number): AsyncGenerator<string, void, undefined> {
    const fetchUrl = `${this.url}place`;
    const fetchOptions: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId })
    };

    let response;
    try {
      response = await fetch(fetchUrl, fetchOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Fetch call failed:", error);
      return;
    }

    if (!response.body) {
      console.error("ReadableStream not available in the response body.");
      return;
    }

    const reader = response.body.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        yield new TextDecoder().decode(value);
      }
    } catch (error) {
      console.error("Error reading from the stream:", error);
    } finally {
      reader.releaseLock();
    }
  }
}
