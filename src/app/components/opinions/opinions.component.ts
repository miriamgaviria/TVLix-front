import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Opinion } from '../../models/opinion.model';
import { OpinionService } from './../../services/opinion.service';

@Component({
  selector: 'app-opinions',
  templateUrl: './opinions.component.html',
  styleUrls: ['./opinions.component.css']
})
export class OpinionsComponent implements OnInit {
  
  isLoading = true;
  opinions: Opinion[];
  opinionsEmpty: boolean = true;

  constructor(private opinionService: OpinionService,
    private router: Router) { }

  ngOnInit(): void {
    this.opinionService.getOpinionList().subscribe(
      (data) => {
        this.opinions = data;
        console.log('lista de opiniones', data);
        this.isLoading = false;
        if(this.opinions.length>0){
          this.opinionsEmpty = false;
        }
        
      }
    )
  }

}
