import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  _id: string | undefined | null;
  objProduct: any;
  product!: Product;
  waiting = false;
  notFound = false;

  constructor() { }

  ngOnInit(): void {
  }

}
