import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { isUserAuthenticated } from 'src/app/auth/isUserAuthenticated';
import { DatabaseService } from '../../database.service';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  _id: string | undefined | null;
  form!: FormGroup;
  product: Product = { name: '', brand: '', size: 0, price: 0, url: '' };
  objProduct: any;
  waiting = false;
  notFound = false;

  constructor(
    private web: DatabaseService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  edit() {
    if (this.verifyErrorOnForm()) return;
    this.web.editProduct(this._id, this.product).subscribe((res) => {
      if (res.ok == true) {
        this.toastr.success('Edição realizada com sucesso!');
        this.router.navigate([`/products`]);
      } else {
        this.toastr.error('Não foi possível realizar a edição.');
      }
    });
  }

  getProduct() {}

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

  async loadProduct(_id: string): Promise<void> {
    this.waiting = true;
    this.objProduct = await this.web.getProduct(_id);
    this.waiting = false;
    this.product = this.objProduct.product;
  }

  ngOnInit(): void {
    isUserAuthenticated(this.router);
    this._id = this.route.snapshot.paramMap.get('id');
    if (this._id !== null && this._id !== undefined) this.loadProduct(this._id);
    this.initForm();
  }
}
