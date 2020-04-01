import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../models/user.model'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  user: User = new User();

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  public createAccount(): void {
    console.log('clicked')
    console.log(this.user)
    this.userService.postUser(this.user).subscribe(
      response => {console.log('creado cliente')}
    )
    
    this.router.navigate(['/tvShows']);
  }

}
