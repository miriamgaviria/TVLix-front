import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { isNil} from 'lodash/isNil';
import swal from'sweetalert2';

import { Opinion } from '../../../models/opinion.model'
import { OpinionService } from 'src/app/services/opinion.service';

import Texts from '../../../../assets/texts.json';

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
  validateEmail: boolean = true;
  validateForm: boolean = true;

  constructor(
    private opinionService: OpinionService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.isLoading = false;
  }

  public createOpinion(): void {
    if (this.opinion.rate === null || this.opinion.rate === undefined
      || this.opinion.comment === null || this.opinion.comment === undefined || this.opinion.comment === ''
      || this.opinion.email === null || this.opinion.email === undefined || this.opinion.email === ''){
      this.validateForm= false
    } else if (!this.checkEmail(this.opinion.email)){
      this.validateEmail=false;
    } else  {
      this.validateForm= true;
      console.log(this.opinion)
      this.saveOpinion(this.opinion);
    }
  }

  public onFocus() {
    this.validateForm= true;
    this.validateEmail=true;
  }

  public saveOpinion(opinion) {
    console.log('opinion', this.opinion)
    console.log('typeof', typeof(this.opinion.rate))
    this.opinionService.postOpinion(this.opinion).subscribe(
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
