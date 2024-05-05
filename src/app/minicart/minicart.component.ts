import { Component, Input, inject } from '@angular/core';
import { OrderListModule } from 'primeng/orderlist';
import { DialogModule } from 'primeng/dialog';
import { ProductQuote } from '../product-tile';
import { ButtonModule } from 'primeng/button';
import { OrderService } from '../order.service';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-minicart',
  standalone: true,
  imports: [
    OrderListModule,
    DialogModule,
    ButtonModule,
  ],
  templateUrl: './minicart.component.html',
  styleUrl: './minicart.component.scss'
})
export class MinicartComponent {
  @Input() products!: ProductQuote[];
  private alive = true;
  cartService: CartService = inject(CartService);
  orderService: OrderService = inject(OrderService);

  customerId: number = -1;

  readonly statusToSeverity = {
    0: 'error', // Error
    1: 'info',  // Info
    2: 'info',  // Info
    3: 'success' // Success
  };

  async placeOrder(customerId: number) {
    this.cartService.setOverlayVisible(false);
    try {
      for await (let chunk of this.orderService.streamOrders(this.customerId)) {
        if (!this.alive) break;
        const chunkData = JSON.parse(chunk);
        const severity = this.statusToSeverity[chunkData.status as keyof typeof this.statusToSeverity] || 'info';
        this.cartService.addMessage({ severity: severity, summary: 'Order Update', detail: chunkData.message });
        console.log(chunk);
      }
    } catch (error: unknown) {
      console.error("Failed to parse chunk or update order:", error);

      let errorMessage = 'Failed to process order update.';

      if (error instanceof Error) {
        errorMessage += ` Error: ${error.message}`;
      } else {
        errorMessage += ` Unexpected error: ${String(error)}`;
      }

      this.cartService.addMessage({
        severity: 'error',
        summary: 'Order Update Error',
        detail: errorMessage
      });
    }
  }

  ngOnDestroy() {
    this.alive = false;

  }
}
