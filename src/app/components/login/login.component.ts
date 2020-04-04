import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder } from '@angular/forms';

import { ToastComponent } from './../toast/toast.component';

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
  // validatePassword: boolean = true;
  // validateUserName: boolean = true;

  constructor( 
    private fb: FormBuilder,
    private loginService: LoginService,
    public router: Router
  ) {
    
  }

  ngOnInit(): void {
  }

  checkIsAdmin(user){
    this.loginService.checkIsUser(this.user).subscribe(
      data => {
        console.log('data', data);
      }
    )
  }

  onLogin(){
    // if ((this.user.userName === null || this.user.userName === undefined) && (this.user.password === null || this.user.password === undefined) ){
    //   this.validateForm= false
    // } else if (this.user.userName === null || this.user.userName === undefined ) {
    //   this.validateForm= true;
    //   this.validateUserName= false;
    // }     
    // else if (this.user.password === null || this.user.password === undefined) {
    //   this.validateForm= true;      
    //   this.validatePassword= false;
    // }
    // else { 
    //   this.validateForm= true;      
    //   this.validatePassword= true;
    //   this.validateUserName= true;
    //   console.log(this.user)
    //   this.checkIsAdmin(this.user);
    // }

    if (this.user.userName === null || this.user.userName === undefined || this.user.password === null || this.user.password === undefined ){
      this.validateForm= false
    } else  { 
      this.validateForm= true;  
      console.log(this.user)
      this.checkIsAdmin(this.user);
    }
  }

  onCreateAccount () {
    console.log('crear cuenta')
    this.router.navigate(['/userForm']);
  }
}
