import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MenubarModule } from 'primeng/menubar'
import { MenuItem } from 'primeng/api'
import { DialogModule } from 'primeng/dialog'
import { ProductTile, ProductQuote } from '../product-tile'
import { Quote } from '../quote'
import { MinicartComponent } from '../minicart/minicart.component'
import { OverlayModule } from 'primeng/overlay'
import { ProductService } from '../product.service'
import { QuoteService } from '../quote.service'
import { CartService } from '../cart.service'
import { MessagesModule } from 'primeng/messages'

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [
    MenubarModule,
    DialogModule,
    MinicartComponent,
    OverlayModule,
    CommonModule,
    MessagesModule
  ],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss'
})
export class MenubarComponent {
  items: MenuItem[] | undefined
  quoteProducts: ProductQuote[] = []
  productService: ProductService = inject(ProductService)
  cartService: CartService = inject(CartService)
  quoteService: QuoteService = inject(QuoteService)

  ngOnInit (): void {
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
        command: () => this.onCartCommand()
      }
    ]
  }

  onCartCommand (): void {
    this.showDialog().catch(error => {
      console.error('Error showing dialog:', error)
    })
  }

  async showDialog (): Promise<void> {
    const quote: Quote = await this.quoteService.getQuote()
    this.quoteProducts = []
    for (const item of quote.itemsList) {
      const emptyTile: ProductTile = {
        id: -1,
        name: 'Unknown',
        price: 0,
        description: 'Unknown',
        image: 'Unknown'
      }
      const product: ProductTile = await this.productService.getProductById(item.productid) ?? emptyTile
      const productQuote: ProductQuote = {
        product,
        quantity: item.quantity
      }
      if (product !== undefined) {
        this.quoteProducts.push(productQuote)
      }
    }
    this.cartService.toggleOverlay()
  }
}
