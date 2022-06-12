import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatabaseService } from '../database.service';
import { Product } from '../models/Product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  form!: FormGroup;
  product: Product = { name: '', brand: '', size: 0, price: 0 };

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
      name: new FormControl(this.product.name, [Validators.required]),
      brand: new FormControl(this.product.brand, [
        Validators.required,
      ]),
      size: new FormControl(this.product.size, [
        Validators.required,
        Validators.min(0),
        Validators.max(55),
      ]),
      price: new FormControl(this.product.price, [
        Validators.required,
        Validators.min(0)
      ]),
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

}
