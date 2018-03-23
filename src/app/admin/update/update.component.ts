import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../product.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  id: number;
  products = [];
  productName: string;
  productArabicName: string;
  productDescription: string;
  productArabicDescription: string;
  productPrice: number;
  productImageURL: string;


  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.route.params.subscribe(response => {
      this.id = parseInt(response.id, 10);
    });
    this.productService.product.subscribe(response => this.products = response);
    for (const product of this.products) {
      if (product.id === this.id) {
        this.productName = product.name;
        this.productArabicName = product.arabicName;
        this.productDescription = product.description;
        this.productArabicDescription = product.arabicDescription;
        this.productPrice = product.price;
        this.productImageURL = product.imageURL;
      }
    }
  }

  invalid() {
    if (typeof this.productPrice === 'undefined') {
      return true;
    }
    // check if the price has more than two decimals
    const decimals = this.productPrice.toString().split('.');
    if (decimals.length > 1) {
      if (decimals[1].length > 2) {
        return true;
      }
    }
    // check if the price is negative
    return this.productPrice < 0;
  }

  updateProduct() {
    for (const i in this.products) {
      if (this.products[i].id === this.id) {
        this.products[i].name = this.productName;
        this.products[i].arabicName = this.productArabicName;
        this.products[i].description = this.productDescription;
        this.products[i].arabicDescription = this.productArabicDescription;
        this.products[i].price = this.productPrice;
        this.products[i].imageURL = this.productImageURL;
        break;
      }
    }
    this.productService.changeProduct(this.products);
    this.router.navigate(['']);
  }
}
