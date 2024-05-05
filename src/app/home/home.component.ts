import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { ProductTile } from '../product-tile';
import { DataViewModule } from 'primeng/dataview';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    DataViewModule,
    RouterModule,
    ButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  productTileList: ProductTile[] = [];
  filteredTileList: ProductTile[] = [];
  productService: ProductService = inject(ProductService);
  quoteService: QuoteService = inject(QuoteService);

  constructor() {
    this.productService.getAllProducts().then((productTileList: ProductTile[]) => {
      this.productTileList = productTileList;
      this.filteredTileList = productTileList;
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredTileList = this.filteredTileList;
      return;
    }
  
    this.filteredTileList = this.filteredTileList.filter(
      productTile => productTile?.name.toLowerCase().includes(text.toLowerCase())
    );
  }

  async addProduct(id: number, qty: number) {
    const quote = await this.quoteService.addProduct(id, qty);
    console.log('Quote:', quote);
  }

}
