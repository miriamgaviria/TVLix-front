import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './../../models/user.model';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.postUser(this.user).subscribe(
      (data) => {
        this.user = data;
        console.log('user', this.user);
      }
    )
  }

}
