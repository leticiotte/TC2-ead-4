import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatabaseService } from '../database.service';
import { User } from '../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  form!: FormGroup;
  user: User = { name: '', email: '', password: '', cpf: '' };
  email = '';
  password = '';

  constructor(
    private web: DatabaseService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  add() {
    if (this.verifyErrorOnForm()) return;
    this.web.addUser(this.user).subscribe((res) => {
      if (res.ok == true) {
        this.toastr.success('Cadastro realizado com sucesso!');
        sessionStorage.setItem('userId', (res.body as any).user._id);
        this.router.navigate(['/products']);
      } else {
        this.toastr.error('Não foi possível realizar o cadastro.');
      }
    });
  }

  login() {
    const response = this.web
      .authenticateUser(this.email, this.password)
      .subscribe(
        (res) => {
          if (res.ok == true) {
            if ((res.body as any).status == 'Erro') {
              this.toastr.error(
                'Não foi possível realizar o login: ' + (res.body as any).msg
              );
              this.router.navigate(['/home']);
              return;
            }
            this.toastr.success('Login realizado com sucesso!', undefined, {
              timeOut: 2000,
            });
            sessionStorage.setItem('userId', (res.body as any).user._id);
            this.router.navigate(['/products']);
          } else {
            this.toastr.error('Não foi possível realizar o login');
          }
        },
        (_err) => {
          this.toastr.error('Não foi possível realizar o login');
        }
      );
  }

  verifyErrorOnForm() {
    if (this.form.get('password')?.errors?.['min']) {
      this.toastr.error('A senha precisa ter no mínimo 8 caracteres');
      return true;
    }
    if (this.form.get('email')?.errors?.['email']) {
      this.toastr.error('Insira um e-mail válido');
      return true;
    }
    if (!this.form.valid) {
      this.toastr.error('Preencha todos os campos');
      return true;
    }

    return false;
  }

  initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this.user.name, [Validators.required]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
      ]),
      cpf: new FormControl(this.user.cpf, [
        Validators.required,
        Validators.minLength(14),
        Validators.maxLength(14),
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) this.router.navigate(['/products']);
    this.initForm();
  }
}
