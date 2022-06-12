import { Component, OnInit } from '@angular/core';
import { Order } from '../models/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  listOrders: Order[] = []
  order: Order | undefined
  objWithOrdersArray :any = { orders : [] }
  waiting = false

  constructor() { }

  ngOnInit(): void {
  }

}
