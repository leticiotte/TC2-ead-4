import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { isUserAuthenticated } from 'src/app/auth/isUserAuthenticated';
import { DatabaseService } from '../../database.service';
import { Order } from '../../models/Order';
import { Product } from '../../models/Product';
import { User } from '../../models/User';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent implements OnInit {
  form!: FormGroup;
  order: Order = {
    _id: '',
    productId: '',
    productName: '',
    quantity: 1,
    creationTimestamp: '',
    zipCode: '',
    streetNumber: 1,
    complement: '',
  };
  listProducts: Product[] = [];
  product: Product | undefined;
  objWithProductsArray: any = { people: [] };
  waiting = false;

  constructor(
    private web: DatabaseService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  add() {
    if (this.verifyErrorOnForm()) return;
    const userId = sessionStorage.getItem('userId');
    if (userId == null) return;
    this.order.userId = userId;
    const date = new Date();
    console.log(`${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`);
    this.web.addOrder(this.order).subscribe(
      (res) => {
        this.toastr.success('Compra adicionada com sucesso!');
        this.router.navigate([`/orders`]);
      },
      (_err) => {
        this.toastr.error('Não foi possível adicionar a compra.');
      }
    );
  }

  verifyErrorOnForm() {
    if (!this.form.valid) {
      this.toastr.error('Preencha todos os campos corretamente');
      return true;
    }

    return false;
  }

  initForm(): void {
    this.form = new FormGroup({
      productId: new FormControl('', [Validators.required]),
      quantity: new FormControl(this.order.quantity, [Validators.required]),
      zipCode: new FormControl(this.order.zipCode, [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
      streetNumber: new FormControl(this.order.streetNumber, [
        Validators.required,
        Validators.min(1),
      ]),
      complement: new FormControl(this.order.streetNumber),
    });
  }

  async loadProducts(): Promise<void> {
    this.waiting = true;
    this.objWithProductsArray = await this.web.loadProducts();
    this.waiting = false;
    this.listProducts = this.objWithProductsArray.products;
    if (this.listProducts.length > 0 && this.listProducts[0]._id != undefined)
      this.order.productId = this.listProducts[0]._id;
  }

  ngOnInit(): void {
    isUserAuthenticated(this.router);
    this.loadProducts();
    this.initForm();
  }
}
