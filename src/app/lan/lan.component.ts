import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-lan',
  templateUrl: './lan.component.html',
  styleUrls: ['./lan.component.scss']
})
export class LanComponent implements OnInit {

  // css = ;
  @Input() lan;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.lan.next(this.lan);
  }

}
