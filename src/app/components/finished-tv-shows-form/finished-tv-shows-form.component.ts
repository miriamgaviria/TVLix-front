import { Component, OnInit } from '@angular/core';

import  isNil from 'lodash/isNil';

import { TvShowApi } from '../../models/tvShowApi.model';
import { TvShowsService } from './../../services/tvShows.service';
import { TvShow } from '../../models/tvShow.model';

import Images from '../../../assets/imagesUrl.json';
import Texts from '../../../assets/texts.json';
import WatchedStatus from '../../../assets/configs/watchedStatus.json';

import { FinishedTvShow } from './../../models/finishedTvShow.model';
import { UserTvShow } from './../../models/userTvShow.model';

@Component({
  selector: 'app-finished-tv-shows-form',
  templateUrl: './finished-tv-shows-form.component.html',
  styleUrls: ['./finished-tv-shows-form.component.css']
})
export class FinishedTvShowsFormComponent implements OnInit {
  images: any = Images;
  texts: any = Texts;
  watchedStatus: any = WatchedStatus;

  isLoading: boolean = true;
  tvShowApi: TvShowApi;
  tvShow: TvShow;

  finishedTvShow: UserTvShow = new UserTvShow();
  tvShowId: string;
  userId: any;

  validateForm: boolean = true;

  constructor(private tvShowsService: TvShowsService) { }

  ngOnInit(): void {
    this.tvShowId = localStorage.getItem('tvShowId');
    localStorage.removeItem('tvShowId');
    this.userId = localStorage.getItem('userId');
    localStorage.removeItem('userId');

    this.tvShowsService.getTvShow(this.tvShowId).subscribe(
      (newData) => {
        this.tvShowApi = newData;
        this.tvShow = this.tvShowApi.tvShow
        this.isLoading = false;
      }
      )
    }

    public saveFinishedTvShow(finishedTvShow: UserTvShow) {
      this.finishedTvShow.watchedStatus = this.watchedStatus.finished;
      this.finishedTvShow.userId =this.userId;
      console.log('this.finishedTvShow', this.finishedTvShow)
      console.log('this.tvShow', this.tvShow)
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
    if (isNil(this.finishedTvShow.rate) || isNil(this.finishedTvShow.opinion)  ) {
      this.validateForm = false
    } else  {
      this.validateForm = true;
      this.saveFinishedTvShow(this.finishedTvShow);
    }
  }
}
