import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {ProductService} from '../../product.service';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class InsertComponent implements OnInit {

  products = [];
  currentUser;
  productName: string;
  productArabicName: string;
  productDescription: string;
  productArabicDescription: string;
  productPrice: number;
  productImageURL: string;
  constructor(private product: ProductService, private user: UserService, private router: Router) { }

  ngOnInit() {
    this.user.currentUser.subscribe(response => this.currentUser = response);
    // check if the user is authorised to insert if not send him back to home page
    if (this.currentUser.role === 'guest') {
      this.router.navigate(['']);
    }
    // get the product list to insert into it later
    this.product.product.subscribe(response => this.products = response);
  }

  insertProduct() {
    // push the new product into the local product list
    this.products.push({
      id: ++this.product.lastId,
      name: this.productName,
      arabicName: this.productArabicName,
      description: this.productDescription,
      arabicDescription: this.productArabicDescription,
      price: this.productPrice,
      imageURL: this.productImageURL,
    });
    // send the product list to the service
    this.product.changeProduct(this.products);

    // reset the form
    this.productName = '';
    this.productArabicName = '';
    this.productDescription = '';
    this.productArabicDescription = '';
    this.productPrice = 0;
    this.productImageURL = '';
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

}
