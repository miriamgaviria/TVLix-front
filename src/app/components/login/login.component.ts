import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import isNil from 'lodash/isNil';

import swal from'sweetalert2';

import { User } from '../../models/user.model';

import { LoginService } from '../../services/login.service';

import Images from '../../../assets/imagesUrl.json';
import Texts from '../../../assets/texts.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  images: any = Images;
  texts: any = Texts;

  isLoading: boolean = true;

  isUser: number;
  user: User = new User();
  userName: string;
  userId: string
  validateForm: boolean = true;

  constructor(
    private loginService: LoginService,
    public router: Router
  ) {}

  ngOnInit(): void {
    sessionStorage.removeItem('userId');
    this.isLoading = false;
  }

  checkIsAdmin(user: User){
    this.isLoading = true;
    this.loginService.checkIsUser(user).subscribe(
      response => {
        if (response === 0){
          swal.fire({
            background: 'rgb(211,211,211)',
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario no válido'
          })
        } else if (response === 1) {
          swal.fire({
            background: 'rgb(211,211,211)',
            icon: 'error',
            title: 'Oops...',
            text: 'El usuario y la contraseña no coinciden'
          })
        } else if (response === 2){
          sessionStorage.setItem('userName', user.userName);
          this.router.navigate(['/userTvShows']);
        }
      }
    )
    this.isLoading = false;
  }

  onFocus() {
    this.validateForm= true;
  }

  onLogin(){
    if (isNil(this.user.userName) || this.user.userName === '' || isNil(this.user.password) || this.user.password === '' ){
      this.validateForm = false
    } else  {
      this.validateForm = true;
      this.checkIsAdmin(this.user);
    }
  }

  onCreateAccount () {
    this.router.navigate(['/userForm']);
  }
}
