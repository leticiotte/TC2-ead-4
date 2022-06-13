import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { isUserAuthenticated } from 'src/app/auth/isUserAuthenticated';
import { DatabaseService } from '../../database.service';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  form!: FormGroup;
  product: Product = {
    name: '',
    brand: '',
    size: 1,
    price: 1,
    url: '',
  };

  constructor(
    private web: DatabaseService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  add() {
    if (this.verifyErrorOnForm()) return;
    const price = this.product.price.toFixed(2);
    this.product.price = Number(price);
    this.web.addProduct(this.product).subscribe(
      (res) => {
        this.toastr.success('Produto adicionado com sucesso!');
        this.router.navigate([`/products`]);
      },
      (_err) => {
        this.toastr.error('Não foi possível adicionar o produto.');
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
      name: new FormControl(this.product.name, [Validators.required]),
      brand: new FormControl(this.product.brand, [Validators.required]),
      size: new FormControl(this.product.size, [
        Validators.required,
        Validators.min(1),
        Validators.max(55),
      ]),
      price: new FormControl(this.product.price, [
        Validators.required,
        Validators.min(1),
      ]),
      url: new FormControl(this.product.url, [Validators.required]),
    });
  }

  ngOnInit(): void {
    isUserAuthenticated(this.router);
    this.initForm();
  }
}
