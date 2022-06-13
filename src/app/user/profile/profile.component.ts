import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { isUserAuthenticated } from 'src/app/auth/isUserAuthenticated';
import { DatabaseService } from '../../database.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  objUser: any;
  user: User = { name: '', email: '', cpf: '', password: '' };
  waiting = false;
  notFound = false;

  constructor(private web: DatabaseService, private router: Router) {}

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
    this.loadProfile();
  }
}
