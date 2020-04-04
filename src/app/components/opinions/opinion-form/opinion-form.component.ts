import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Opinion } from '../../../models/opinion.model'
import { OpinionService } from 'src/app/services/opinion.service';

@Component({
  selector: 'app-opinion-form',
  templateUrl: './opinion-form.component.html',
  styleUrls: ['./opinion-form.component.css']
})
export class OpinionFormComponent implements OnInit {

  inValidForm = true;
  isLoading = true;
  opinion: Opinion = new Opinion();
  opinionForm: FormGroup;
  submitted = false;

  constructor(
    private opinionService: OpinionService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.isLoading = false;
  }


  public createOpinion(): void {
    console.log(this.opinion)
    this.opinionService.postOpinion(this.opinion).subscribe(
      response => {console.log('creado cliente')}
    )
    this.router.navigate(['/tvShows']);

  }
}