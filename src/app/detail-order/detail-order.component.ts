import { Component, OnInit } from '@angular/core';
import { Order } from '../models/Order';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent implements OnInit {
  _id: string | undefined | null;
  objOrder: any;
  order!: Order;
  waiting = false;
  notFound = false;

  constructor() { }

  ngOnInit(): void {
  }

}
