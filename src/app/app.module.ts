import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { IMaskModule } from 'angular-imask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoaderComponent } from './loader/loader.component';
import { ProductsComponent } from './product/products/products.component';
import { OrdersComponent } from './order/orders/orders.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { DetailProductComponent } from './product/detail-product/detail-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { DetailOrderComponent } from './order/detail-order/detail-order.component';
import { AddOrderComponent } from './order/add-order/add-order.component';
import { EditOrderComponent } from './order/edit-order/edit-order.component';
import { ErrorCatchingInterceptor } from './interceptors/error-catching.interceptor';
import { PricePipe } from './price.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoaderComponent,
    ProductsComponent,
    OrdersComponent,
    ProfileComponent,
    AddProductComponent,
    DetailProductComponent,
    EditProductComponent,
    EditProfileComponent,
    DetailOrderComponent,
    AddOrderComponent,
    EditOrderComponent,
    PricePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    IMaskModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
