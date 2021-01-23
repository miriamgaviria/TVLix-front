import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Texts from '../../../assets/texts.json';

import isNil from 'lodash/isNil';

import swal from'sweetalert2';

import { User } from '../../models/user.model';

import { LoginService } from '../../services/login.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  texts: any = Texts;

  isUser: number;
  user: User = new User();
  validateForm: boolean = true;

  constructor(
    private loginService: LoginService,
    public router: Router,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {

  }

  checkIsAdmin(user: User){
    let isValidateUser: number;
    this.loginService.checkIsUser(this.user).subscribe(
      data => {
        isValidateUser = data;
        if (isValidateUser === 0){
          swal.fire({
            background: 'rgb(211,211,211)',
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario no válido'
          })
        } else if (isValidateUser === 1) {
          swal.fire({
            background: 'rgb(211,211,211)',
            icon: 'error',
            title: 'Oops...',
            text: 'El usuario y la contraseña no coinciden'
          })
        } else if (isValidateUser === 2){
          this.userService.getUserByUserName(this.user.userName).subscribe(
            response => {
              localStorage.setItem('loggedUserId', response.id);
              localStorage.setItem('loggedUserUserName', response.userName);
            }
          )

          this.router.navigate(['/tvShows']);
        }
      }
    )
  }

  onFocus() {
    this.validateForm= true;
  }

  onLogin(){
    if (isNil(this.user.userName) || this.user.userName === '' || isNil(this.user.password) || this.user.password === '' ){
      this.validateForm= false
    } else  {
      this.validateForm= true;
      this.checkIsAdmin(this.user);
    }
  }

  onCreateAccount () {
    this.router.navigate(['/userForm']);
  }
}
