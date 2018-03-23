import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products = [];
  currentUser;
  lan;

  constructor(private product: ProductService, private user: UserService) { }

  ngOnInit() {
    this.product.product.subscribe(response => this.products = response);
    this.user.currentUser.subscribe(response => this.currentUser = response);
    this.product.lan.subscribe(response => this.lan = response);
  }

  delete(i) {
    this.products.splice(i, 1);
    this.product.changeProduct(this.products);
  }

}
