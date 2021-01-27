import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './../../models/user.model';
import { UserService } from './../../services/user.service';

import Texts from '../../../assets/texts.json';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  texts: any = Texts;

  isLoading = true;
  user: User;
  userName: string = 'cristina';

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {

    this.userService.getUserByUserName(this.userName).subscribe(
      (data) => {
        console.log('data', data)
        this.user = data;
        this.user.name = this.user.name.charAt(0).toUpperCase().concat(this.user.name.substring(1, this.user.name.length));
        this.user.surname = this.user.surname.charAt(0).toUpperCase().concat(this.user.surname.substring(1, this.user.surname.length));
        this.user.userName = this.user.userName.charAt(0).toUpperCase().concat(this.user.userName.substring(1, this.user.userName.length));
        this.user.location = this.user.location.charAt(0).toUpperCase().concat(this.user.location.substring(1, this.user.location.length));
        this.user.typeMedia = this.user.typeMedia.charAt(0).toUpperCase().concat(this.user.typeMedia.substring(1, this.user.typeMedia.length));
        this.user.genre = this.user.genre.charAt(0).toUpperCase().concat(this.user.genre.substring(1, this.user.genre.length));
        this.isLoading = false;
      }
    )
  }

  public updateProfile(user: User){
    localStorage.setItem('userToUpdate', JSON.stringify(user));
    localStorage.setItem('previousUrl', this.router.url);
    this.router.navigate(['/userForm']);
  }
}
