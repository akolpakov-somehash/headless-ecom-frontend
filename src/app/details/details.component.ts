import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { ProductService } from '../product.service'
import { ProductTile } from '../product-tile'
import { CardModule } from 'primeng/card'

interface RouteParams {
  id: string
}

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    CardModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute)
  productService = inject(ProductService)
  productTile: ProductTile | undefined

  constructor () {
    const productId = parseInt((this.route.snapshot.params as RouteParams).id, 10)
    this.productService.getProductById(productId)
      .then(productTile => {
        this.productTile = productTile
      })
      .catch(error => {
        console.error(error)
      })
  }

  addToCart (productTile: ProductTile): void {
    // this.productService.addToCart(this.productTile);
  }
}
