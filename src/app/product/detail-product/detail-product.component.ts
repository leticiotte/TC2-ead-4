import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';
import { isUserAuthenticated } from 'src/app/auth/isUserAuthenticated';
import { DatabaseService } from '../../database.service';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
})
export class DetailProductComponent implements OnInit {
  _id: string | undefined | null;
  objProduct: any;
  product!: Product;
  waiting = false;
  notFound = false;

  constructor(
    private web: DatabaseService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  async loadProduct(_id: string): Promise<void> {
    this.waiting = true;
    this.objProduct = await this.web.getProduct(_id);
    this.waiting = false;
    this.product = this.objProduct.product;
  }

  deleteProduct(_id: any): void {
    var r = confirm(`Deseja mesmo excluir ${this.product.name}?`);
    if (r != true) return;
    this.web.deleteProduct(_id.toString()).subscribe(
      (res) => {
        this.toastr.success('Produto excluído com sucesso!');
        this.router.navigate(['/products']);
      },
      (_err) => {
        this.toastr.error(_err.error.displayMessage);
      }
    );
  }

  ngOnInit(): void {
    isUserAuthenticated(this.router);
    this._id = this.route.snapshot.paramMap.get('id');
    if (this._id !== null && this._id !== undefined) this.loadProduct(this._id);
  }
}
