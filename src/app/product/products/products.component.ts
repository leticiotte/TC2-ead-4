import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { isUserAuthenticated } from '../../auth/isUserAuthenticated';
import { DatabaseService } from '../../database.service';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  listProducts: Product[] = [];
  product: Product | undefined;
  objWithProductsArray: any = { people: [] };
  waiting = false;

  constructor(private web: DatabaseService, private router: Router) {}

  async loadProducts(): Promise<void> {
    this.waiting = true;
    this.objWithProductsArray = await this.web.loadProducts();
    this.waiting = false;
    this.listProducts = this.objWithProductsArray.products;
  }

  ngOnInit(): void {
    isUserAuthenticated(this.router);
    this.loadProducts();
  }
}
