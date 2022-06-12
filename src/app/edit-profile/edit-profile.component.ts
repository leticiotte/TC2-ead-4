import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatabaseService } from '../database.service';
import { Product } from '../models/Product';
import { User } from '../models/User';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  form!: FormGroup;
  user: User = { name: '', email: '', cpf: '', password: '' };

  constructor(private web: DatabaseService, private toastr: ToastrService) {}

  edit() {
    if (this.verifyErrorOnForm()) return;
  }

  verifyErrorOnForm() {
    if (this.form.get('age')?.errors?.['max']) {
      this.toastr.error('A idade máxima é de 130 anos');
      return true;
    }
    if (this.form.get('age')?.errors?.['min']) {
      this.toastr.error('A idade mínima é de 0 anos');
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
      email: new FormControl({ value: '', disabled: true }, [Validators.required]),
      cpf: new FormControl(this.user.cpf, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.initForm();
  }


}
