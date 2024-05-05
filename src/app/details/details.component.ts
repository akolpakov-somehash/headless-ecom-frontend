import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { ProductTile } from '../product-tile';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  productService = inject(ProductService);
  productTile: ProductTile | undefined;

  constructor() {
    const productId = parseInt(this.route.snapshot.params['id'], 10);
    this.productService.getProductById(productId).then(productTile => {
      this.productTile = productTile;
    });
  }

  addToCart(productTile: ProductTile) {
    // this.productService.addToCart(this.productTile);
  }
}