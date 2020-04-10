import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { isNil} from 'lodash/isNil';

import swal from'sweetalert2';

import { User } from '../../models/user.model';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isUser: number;
  user: User = new User();
  validateForm: boolean = true;

  constructor( 
    private loginService: LoginService,
    public router: Router
  ) {
    
  }

  ngOnInit(): void {
  }

  checkIsAdmin(user){
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
          this.router.navigate(['/tvShows']);
        }
      }
    )
  }

  onFocus() {
    this.validateForm= true;
  }

  onLogin(){

    if (this.user.userName === null || this.user.userName === undefined || this.user.userName === '' 
      || this.user.password === null || this.user.password === undefined || this.user.password === '' ){
      this.validateForm= false
    } else  { 
      this.validateForm= true;  
      console.log(this.user)
      this.checkIsAdmin(this.user);
    }

    // if (isNil(this.user.userName) || this.user.userName === '' || isNil(this.user.password) || this.user.password === ''){
    //   this.validateForm= false;
    //   console.log('mal', this.user.userName)
    // } else  { 
    //   this.validateForm= true;  
    //   console.log(this.user)
    //   this.checkIsAdmin(this.user);
    // }
  }

  onCreateAccount () {
    console.log('crear cuenta')
    this.router.navigate(['/userForm']);
  }
}
