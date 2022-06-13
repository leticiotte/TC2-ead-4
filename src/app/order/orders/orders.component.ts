import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatabaseService } from '../../database.service';
import { Order } from '../../models/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  listOrders: Order[] = [];
  order: Order | undefined;
  objWithOrdersArray: any = { orders: [] };
  waiting = false;

  constructor(
    private web: DatabaseService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  async loadOrders(): Promise<void> {
    this.waiting = true;
    const userId = sessionStorage.getItem('userId');
    if (userId == null) return;
    this.objWithOrdersArray = await this.web.loadOrders(userId);
    this.waiting = false;
    this.listOrders = this.objWithOrdersArray.orders;
  }

  ngOnInit(): void {
    this.loadOrders();
  }
}
