import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { isUserAuthenticated } from 'src/app/auth/isUserAuthenticated';
import { DatabaseService } from '../../database.service';
import { Order } from '../../models/Order';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css'],
})
export class EditOrderComponent implements OnInit {
  form!: FormGroup;
  _id: string | undefined | null;
  objOrder: any;
  waiting = false;
  notFound = false;
  order: Order = {
    _id: '',
    productId: '',
    productName: '',
    quantity: 0,
    creationTimestamp: '',
    zipCode: '',
    streetNumber: 0,
    complement: '',
    totalValue: 0,
  };
  listProducts: Product[] = [];
  product: Product | undefined;
  objWithProductsArray: any = { people: [] };

  constructor(
    private web: DatabaseService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  edit() {
    if (this.verifyErrorOnForm()) return;
    this.web.editOrder(this._id, this.order).subscribe((res) => {
      if (res.ok == true) {
        this.toastr.success('Edição realizada com sucesso!');
        this.router.navigate([`/orders`]);
      } else {
        this.toastr.error('Não foi possível realizar a edição.');
      }
    });
  }

  verifyErrorOnForm() {
    if (this.form.get('age')?.errors?.['max']) {
      this.toastr.error('A idade máxima é de 130 anos');
      return true;
    }
    if (this.form.get('age')?.errors?.['min']) {
      this.toastr.error('A idade mínima é de 0 anos');
      return true;
    }
    if (!this.form.valid) {
      this.toastr.error('Preencha todos os campos');
      return true;
    }

    return false;
  }

  initForm(): void {
    this.form = new FormGroup({
      productId: new FormControl(this.order.productId, [Validators.required]),
      quantity: new FormControl(this.order.quantity, [Validators.required]),
      zipCode: new FormControl(this.order.zipCode, [Validators.required]),
      streetNumber: new FormControl(this.order.streetNumber, [
        Validators.required,
        Validators.min(1),
      ]),
      complement: new FormControl(this.order.streetNumber, []),
    });
  }

  async loadOrder(_id: string): Promise<void> {
    this.waiting = true;
    this.objOrder = await this.web.getOrder(_id);
    this.waiting = false;
    this.order = this.objOrder.order;
  }

  async loadProducts(): Promise<void> {
    this.waiting = true;
    this.objWithProductsArray = await this.web.loadProducts();
    this.waiting = false;
    this.listProducts = this.objWithProductsArray.products;
  }

  ngOnInit(): void {
    isUserAuthenticated(this.router);
    this._id = this.route.snapshot.paramMap.get('id');
    if (this._id !== null && this._id !== undefined) this.loadOrder(this._id);
    this.loadProducts();
    this.initForm();
  }
}
