import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { isUserAuthenticated } from '../auth/isUserAuthenticated';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private web: DatabaseService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    /*if (!isUserAuthenticated(this.router)) {
      return;
    }*/
  }
}
