import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Order } from './models/Order';
import { Product } from './models/Product';
import { User } from './models/User';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}

  baseURL = 'https://leticia-goncalves-ead-4.glitch.me';

  addUser(user: User) {
    let body = new HttpParams();
    body = body.set('name', user.name);
    body = body.set('email', user.email);
    body = body.set('cpf', user.cpf);
    body = body.set('password', user.password);
    return this.http.post(this.baseURL + '/users', body, {
      observe: 'response',
    });
  }

  authenticateUser(email: string, password: string) {
    let body = new HttpParams();
    body = body.set('email', email);
    body = body.set('password', password);
    return this.http.post(this.baseURL + '/users/auth', body, {
      observe: 'response',
    });
  }

  async loadProducts() {
    return firstValueFrom(this.http.get(this.baseURL + '/products'));
  }

  async getProduct(productId: string) {
    return firstValueFrom(
      this.http.get(this.baseURL + `/products/${productId}`)
    );
  }

  addProduct(product: Product) {
    let body = new HttpParams();
    body = body.set('name', String(product.name));
    body = body.set('brand', product.brand);
    body = body.set('size', product.size);
    body = body.set('price', product.price);
    body = body.set('url', product.url);
    return this.http.post(this.baseURL + '/products', body, {
      observe: 'response',
    });
  }

  deleteProduct(productId: string) {
    return this.http.delete(this.baseURL + '/products/' + productId);
  }

  editProduct(_id: any, product: Product) {
    let body = new HttpParams();
    body = body.set('name', String(product.name));
    body = body.set('brand', product.brand);
    body = body.set('size', product.size);
    body = body.set('price', product.price);
    body = body.set('url', product.url);
    return this.http.patch(this.baseURL + '/products/' + _id, body, {
      observe: 'response',
    });
  }

  async loadOrders(userId: string) {
    return firstValueFrom(
      this.http.get(this.baseURL + `/users/${userId}/orders`)
    );
  }

  async getOrder(orderId: string) {
    return firstValueFrom(this.http.get(this.baseURL + `/orders/${orderId}`));
  }

  addOrder(order: Order) {
    let body = new HttpParams();
    body = body.set('productId', String(order.productId));
    body = body.set('userId', String(order.userId));
    body = body.set('quantity', String(order.quantity));
    body = body.set('zipCode', String(order.zipCode));
    body = body.set('streetNumber', String(order.streetNumber));
    body = body.set('complement', String(order.complement));
    return this.http.post(this.baseURL + '/orders', body, {
      observe: 'response',
    });
  }

  deleteOrder(orderId: string) {
    return this.http.delete(this.baseURL + '/orders/' + orderId);
  }

  editOrder(_id: any, order: Order) {
    let body = new HttpParams();
    body = body.set('productId', String(order.productId));
    body = body.set('userId', String(order.userId));
    body = body.set('quantity', String(order.quantity));
    body = body.set('zipCode', String(order.zipCode));
    body = body.set('streetNumber', String(order.streetNumber));
    body = body.set('complement', String(order.complement));
    return this.http.patch(this.baseURL + '/orders/' + _id, body, {
      observe: 'response',
    });
  }

  //-----------------------------

  async getUser(userId: string) {
    return firstValueFrom(this.http.get(this.baseURL + `/users/${userId}`));
  }

  editUser(_id: any, user: User) {
    let body = new HttpParams();
    body = body.set('name', String(user.name));
    body = body.set('cpf', user.cpf);
    return this.http.patch(this.baseURL + '/users/' + _id, body, {
      observe: 'response',
    });
  }
}
