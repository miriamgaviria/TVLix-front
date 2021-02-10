import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import  isNil from 'lodash/isNil';

import swal from'sweetalert2';

import { Opinion } from '../../../models/opinion.model'
import { OpinionService } from 'src/app/services/opinion.service';

import Texts from '../../../../assets/texts.json';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-opinion-form',
  templateUrl: './opinion-form.component.html',
  styleUrls: ['./opinion-form.component.css']
})
export class OpinionFormComponent implements OnInit {
  texts: any = Texts;

  inValidForm = true;
  isLoading = true;
  opinion: Opinion = new Opinion();
  opinionForm: FormGroup;
  submitted = false;
  userId: any;
  validateEmail: boolean = true;
  validateForm: boolean = true;

  constructor(
    private opinionService: OpinionService,
    private router: Router,
    private userService: UserService,
    ) { }

    ngOnInit(): void {
      this.isLoading = false;
      this.userId = localStorage.getItem('userId');
      localStorage.removeItem('userId');
      this.userService.getUserById(this.userId).subscribe(
        response => {
          this.opinion.user = response
        }
      )
  }

  public createOpinion(): void {
    if (isNil(this.opinion.rate) || isNil(this.opinion.comment) || this.opinion.comment === '' ) {
      this.validateForm= false
    } else  {
      this.validateForm= true;

      this.saveOpinion(this.opinion);
    }
  }

  public onFocus() {
    this.validateForm= true;
    this.validateEmail=true;
  }

  public saveOpinion(opinion: Opinion) {
    this.opinionService.postOpinion(opinion).subscribe(
      response => {
        swal.fire({
          background: 'rgb(211,211,211)',
          icon: 'success',
          title: 'Valoración enviada',
          text: 'Gracias por valorarnos'
        }),
        this.router.navigate(['/opinions']);
      },
      error => {
        swal.fire({
          background: 'rgb(211,211,211)',
          icon: 'error',
          title: 'Oops...',
          text: 'No se ha podido enviar la valoración'
        })
      }
    )
  }

  private checkEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
