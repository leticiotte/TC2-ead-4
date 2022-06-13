import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'E-shoes';

  constructor(private toastr: ToastrService, private router: Router) {}

  logout() {
    sessionStorage.clear();
    this.toastr.success('Logout realizado com sucesso!', undefined, {
      timeOut: 2000,
    });
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {}
}
