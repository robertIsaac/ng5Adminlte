import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProductService {

  private products = new BehaviorSubject<any>([
    {
      id: 1,
      name: 'Microsoft surface book 2',
      arabicName: 'ميكروسوفت سرفس بوك 2',
      description: 'a laptop with touch screen with up to 16gb of ddr4 rams and 512 GB ssd',
      arabicDescription: 'لاب توب بشاشة لمس مع رامات تصل الى 16 جيجا من النوع DDR4 وهارد SSD يصل الى 512 جيجا بايت',
      price: '30000',
      imageURL: 'assets/products/Surface_Book2.jpg',
    },
    {
      id: 2,
      name: 'Apple Macbook pro',
      arabicName: 'ابل ماك بوك برو',
      description: '',
      arabicDescription: '',
      price: '25000',
      imageURL: 'assets/products/macbook_pro.jpg',
    },
    {
      id: 3,
      name: 'dell xps',
      arabicName: 'ديل اكس بى اس',
      description: '',
      arabicDescription: '',
      price: '20000',
      imageURL: 'assets/products/dell_xps.jpg',
    },
    {
      id: 4,
      name: 'HP spectre x360',
      arabicName: 'اتش بى اسبيكتر اكس 360',
      description: '',
      arabicDescription: '',
      price: '15000',
      imageURL: 'assets/products/hp_spectre_x360.jpg',
    }
  ]);

  lastId = 4;

  product = this.products.asObservable();

  constructor() { }

  changeProduct(product) {
    this.products.next(product);
  }

}
