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

  isLoading: boolean;
  user: User;
  userId: number;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('userId'));
    this.isLoading = true;
    this.userService.getUserById(this.userId).subscribe(
      (data) => {
        this.user = data;
        this.user.name = this.formatData(this.user.name);
        this.user.surname = this.formatData(this.user.surname);
        this.user.location = this.formatData(this.user.location);
        this.user.typeMedia = this.formatData(this.user.typeMedia);
        this.user.genre = this.formatData(this.user.genre);
        this.isLoading = false;
      }
    )
  }
  private formatData (data: string) {
    return data.charAt(0).toUpperCase().concat(data.substring(1, data.length));
  }

  public updateProfile(user: User){
    localStorage.setItem('userToUpdate', JSON.stringify(user));
    this.router.navigate(['/userForm']);
  }
}
