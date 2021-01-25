import { Component, OnInit } from '@angular/core';

import  isNil from 'lodash/isNil';

import { TvShowApi } from '../../models/tvShowApi.model';
import { TvShowsService } from './../../services/tvShows.service';
import { TvShow } from '../../models/tvShow.model';

import Images from '../../../assets/imagesUrl.json';
import Texts from '../../../assets/texts.json';

import { FinishedTvShow } from './../../models/finishedTvShow.model';

@Component({
  selector: 'app-finished-tv-shows-form',
  templateUrl: './finished-tv-shows-form.component.html',
  styleUrls: ['./finished-tv-shows-form.component.css']
})
export class FinishedTvShowsFormComponent implements OnInit {
  images: any = Images;
  texts: any = Texts;

  isLoading: boolean = true;
  imageTvShow: boolean;
  originalPicture: boolean = true;
  smallPicturesSrc: string;
  tvShowApi: TvShowApi;
  tvShow: TvShow;

  finishedTvShow: FinishedTvShow = new FinishedTvShow();
  tvShowId: string;

  validateForm: boolean = true;

  constructor(private tvShowsService: TvShowsService) { }

  ngOnInit(): void {
    this.tvShowId = localStorage.getItem('tvShowId');
    localStorage.removeItem('tvShowId');

    this.tvShowsService.getTvShow(this.tvShowId).subscribe(
      (newData) => {
        this.tvShowApi = newData;
        this.tvShow = this.tvShowApi.tvShow
        this.isLoading = false;
        console.log('this.tvShow', this.tvShow)
      }
    )
  }

  public saveFinishedTvShow(finishedTvShow: FinishedTvShow) {
    console.log('this.finishedTvShow', this.finishedTvShow)
    // this.opinionService.postOpinion(this.opinion).subscribe(
    //   response => {
    //     swal.fire({
    //       background: 'rgb(211,211,211)',
    //       icon: 'success',
    //       title: 'Valoración enviada',
    //       text: 'Gracias por valorarnos'
    //     }),
    //     this.router.navigate(['/opinions']);
    //   },
    //   error => {
    //     swal.fire({
    //       background: 'rgb(211,211,211)',
    //       icon: 'error',
    //       title: 'Oops...',
    //       text: 'No se ha podido enviar la valoración'
    //     })
    //   }
    // )
  }

  public onSubmit(): void {
    if (isNil(this.finishedTvShow.rate) || isNil(this.finishedTvShow.assessment) || this.finishedTvShow.assessment === '' ) {
      this.validateForm = false
    } else  {
      this.validateForm = true;
      this.saveFinishedTvShow(this.finishedTvShow);
    }
  }

}
