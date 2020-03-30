import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();


  constructor( 
    private fb: FormBuilder,
    public router: Router
  ) {
    
  }

  ngOnInit(): void {
  }

  onLogin(){
    console.log(this.user)
  }

  onCreateAccount (){
    console.log('crear cuenta')
    this.router.navigate(['/profileForm']);
  }

}
