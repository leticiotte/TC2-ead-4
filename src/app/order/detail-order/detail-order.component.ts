import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { isUserAuthenticated } from 'src/app/auth/isUserAuthenticated';
import { DatabaseService } from '../../database.service';
import { Order } from '../../models/Order';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css'],
})
export class DetailOrderComponent implements OnInit {
  _id: string | undefined | null;
  objOrder: any;
  order!: Order;
  waiting = false;
  notFound = false;

  constructor(
    private web: DatabaseService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  async loadOrder(_id: string): Promise<void> {
    this.waiting = true;
    this.objOrder = await this.web.getOrder(_id);
    this.waiting = false;
    this.order = this.objOrder.order;
  }

  deleteOrder(_id: any): void {
    var r = confirm(`Deseja mesmo excluir ${this.order._id}?`);
    if (r != true) return;
    this.web.deleteOrder(_id.toString()).subscribe(
      (res) => {
        this.toastr.success('Compra excluída com sucesso!');
        this.router.navigate(['/orders']);
      },
      (_err) => {
        this.toastr.error(_err.error.displayMessage);
      }
    );
  }

  ngOnInit(): void {
    isUserAuthenticated(this.router);
    this._id = this.route.snapshot.paramMap.get('id');
    if (this._id !== null && this._id !== undefined) this.loadOrder(this._id);
  }
}
