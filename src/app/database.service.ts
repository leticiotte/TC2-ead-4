import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private http: HttpClient) {}

  baseURL = 'https://tiagoifsp.ddns.net/mensagens/jwt';

  addUser(user: User) {
    let body = new HttpParams();
    body = body.set('nome', user.name);
    body = body.set('login', user.email);
    body = body.set('senha', user.password);
    return this.http.put(this.baseURL + '/user.php', body, {
      observe: 'response',
    });
  }

  authenticateUser(email: string, password: string) {
    let body = new HttpParams();
    body = body.set('login', email);
    body = body.set('senha', password);
    return this.http.post(this.baseURL + '/user.php', body, {
      observe: 'response',
    });
  }
}
