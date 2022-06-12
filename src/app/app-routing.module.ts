import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrderComponent } from './add-order/add-order.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DetailOrderComponent } from './detail-order/detail-order.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'detail-order', component: DetailOrderComponent },
  { path: 'add-order', component: AddOrderComponent },
  { path: 'edit-order', component: EditOrderComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'detail-product', component: DetailProductComponent },
  { path: 'edit-product', component: EditProductComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
