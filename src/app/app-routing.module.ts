import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrderComponent } from './order/add-order/add-order.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { DetailOrderComponent } from './order/detail-order/detail-order.component';
import { DetailProductComponent } from './product/detail-product/detail-product.component';
import { EditOrderComponent } from './order/edit-order/edit-order.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './order/orders/orders.component';
import { ProductsComponent } from './product/products/products.component';
import { ProfileComponent } from './user/profile/profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'detail-product/:id', component: DetailProductComponent },
  { path: 'edit-product/:id', component: EditProductComponent },

  { path: 'orders', component: OrdersComponent },
  { path: 'add-order', component: AddOrderComponent },
  { path: 'detail-order/:id', component: DetailOrderComponent },
  { path: 'edit-order/:id', component: EditOrderComponent },

  { path: 'profile', component: ProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
