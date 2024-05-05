import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem, Message } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ProductTile, ProductQuote } from '../product-tile';
import { Quote } from '../quote';
import { MinicartComponent } from '../minicart/minicart.component'; 
import { OverlayModule } from 'primeng/overlay';
import { ProductService } from '../product.service';
import { QuoteService } from '../quote.service';
import { CartService } from '../cart.service';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [
    MenubarModule,
    DialogModule,
    MinicartComponent,
    OverlayModule,
    CommonModule,
    MessagesModule,
  ],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss',
})
export class MenubarComponent {
  items: MenuItem[] | undefined;
  quoteProducts: ProductQuote[] = [];
  productService: ProductService = inject(ProductService);
  cartService: CartService = inject(CartService);
  quoteService: QuoteService = inject(QuoteService);

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/'
      },
      {
        label: 'Cart',
        icon: 'pi pi-fw pi-shopping-cart',
        styleClass: 'ml-auto',
        command: () => this.showDialog(),
      },
    ];
  }

  async showDialog() {
    const quote: Quote = await this.quoteService.getQuote();
    console.log('Quote:', quote);
    this.quoteProducts = [];
    for (const item of quote.itemsList) {
      console.log('Item:', item);
      const product: ProductTile | undefined = await this.productService.getProductById(item.productid);
      const productQuote: ProductQuote = {
        product: product !== undefined ? product : {} as ProductTile,
        quantity: item.quantity,
      };
      if (product !== undefined) {
        this.quoteProducts.push(productQuote);
      }
    }
    this.cartService.toggleOverlay();
}

}
