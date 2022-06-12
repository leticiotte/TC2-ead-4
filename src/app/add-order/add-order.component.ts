import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatabaseService } from '../database.service';
import { Order } from '../models/Order';
import { User } from '../models/User';

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
    quantity: 0,
    date: '',
    zipCode: '',
    streetNumber: 0,
    complement: '',
    totalValue: 0,
  };

  constructor(private web: DatabaseService, private toastr: ToastrService) {}

  add() {
    if (this.verifyErrorOnForm()) return;
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
      quantity: new FormControl(this.order.quantity, [Validators.required]),
      zipCode: new FormControl(this.order.zipCode, [Validators.required]),
      streetNumber: new FormControl(this.order.streetNumber, [
        Validators.required,
        Validators.min(1),
      ]),
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
}
