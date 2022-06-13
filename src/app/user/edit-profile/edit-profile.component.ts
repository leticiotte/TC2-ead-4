import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { isUserAuthenticated } from 'src/app/auth/isUserAuthenticated';
import { DatabaseService } from '../../database.service';
import { Product } from '../../models/Product';
import { User } from '../../models/User';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  form!: FormGroup;
  objUser: any;
  user: User = { name: '', email: '', cpf: '', password: '' };
  waiting = false;
  notFound = false;

  constructor(
    private web: DatabaseService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  edit() {
    if (this.verifyErrorOnForm()) return;
    const userId = sessionStorage.getItem('userId');
    if (userId == null) return;
    this.web.editUser(userId, this.user).subscribe((res) => {
      if (res.ok == true) {
        this.toastr.success('Edição realizada com sucesso!');
        this.router.navigate(['/profile']);
      } else {
        this.toastr.error('Não foi possível realizar a edição.');
      }
    });
  }

  verifyErrorOnForm() {
    if (!this.form.valid) {
      this.toastr.error('Preencha todos os campos');
      return true;
    }

    return false;
  }

  initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this.user.name, [Validators.required]),
      email: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      cpf: new FormControl(this.user.cpf, [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(14),
      ]),
    });
  }

  async loadProfile(): Promise<void> {
    this.waiting = true;
    const userId = sessionStorage.getItem('userId');
    if (userId == null) return;
    this.objUser = await this.web.getUser(userId);
    this.waiting = false;
    this.user = this.objUser.user;
  }

  ngOnInit(): void {
    isUserAuthenticated(this.router);
    this.initForm();
    this.loadProfile();
  }
}
