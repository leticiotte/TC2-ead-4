import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  _id: string | undefined | null;
  objUser: any;
  user!: User;
  waiting = false;
  notFound = false;

  constructor() { }

  ngOnInit(): void {
  }

}
