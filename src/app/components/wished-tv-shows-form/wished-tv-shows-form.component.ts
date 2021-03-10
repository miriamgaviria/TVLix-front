import { Component, OnInit } from '@angular/core';

import  isNil from 'lodash/isNil';

import swal from'sweetalert2';

import { TvShowApi } from '../../models/tvShowApi.model';
import { TvShowsService } from './../../services/tvShows.service';
import { TvShowDetail } from '../../models/tvShowDetail.model';

import Images from '../../../assets/imagesUrl.json';
import Texts from '../../../assets/texts.json';
import WatchedStatus from '../../../assets/configs/watchedStatus.json';
import StreamingPlatforms from '../../../assets/configs/streamingPlatforms.json'

import { UserTvShowDTO } from '../../models/userTvShowDTO.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserTvShowsService } from 'src/app/services/userTvShows.service';

@Component({
  selector: 'app-wished-tv-shows-form',
  templateUrl: './wished-tv-shows-form.component.html',
  styleUrls: ['./wished-tv-shows-form.component.css']
})
export class WishedTvShowsFormComponent implements OnInit {
  images: any = Images;
  texts: any = Texts;
  watchedStatus: any = WatchedStatus;
  streamingPlatforms: any = StreamingPlatforms;

  isLoading: boolean = true;

  tvShowApi: TvShowApi;
  tvShow: TvShowDetail;
  wishedTvShow: UserTvShowDTO = new UserTvShowDTO();
  wishedTvShows: UserTvShowDTO[];

  tvShowId: string;
  userId: any;

  validateForm: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tvShowsService: TvShowsService,
    private userTvShowsService: UserTvShowsService) { }

  ngOnInit(): void {
    this.tvShowId = this.route.snapshot.paramMap.get("tvShowId");
    this.userId = sessionStorage.getItem('userId');
    if (isNil(this.userId)) this.router.navigate(['/login']);


    this.isUserTvShow();
  }

  private isUserTvShow = () => {
    this.userTvShowsService.getUserTvShowsByStatus(this.userId, this.watchedStatus.wished).subscribe(
      (data) => {
        if (!isNil(data)) {
          this.wishedTvShows = data;
          let isTvShowDB = this.wishedTvShows.some(finishedTvShow => finishedTvShow.tvShow.id.toString() === this.tvShowId.toString());
          if (isTvShowDB) {
            swal.fire({
              background: 'rgb(211,211,211)',
              icon: 'error',
              title: 'Oops...',
              text: 'La serie ya está en tu lista de series que quieres ver'
            }),
            this.router.navigate(['/wishedTvShows'])
          } else {
            this.getTvShowDDBB();
          }
        } else {
          this.getTvShowDDBB();
        }
        this.isLoading = false;
      }
    )
  }

  private getTvShowDDBB = () => {
    this.tvShowsService.getTvShow(this.tvShowId).subscribe(
      (newData) => {
        this.tvShowApi = newData;
        this.tvShow = this.tvShowApi.tvShow
      }
    )
  }

  public saveWishedTvShow(wishedTvShow: UserTvShowDTO) {
    this.wishedTvShow.watchedStatus = this.watchedStatus.wished;
    // this.wishedTvShow.userId =this.userId;
    console.log('this.wishedTvShow', this.wishedTvShow)
    console.log('this.tvShow', this.tvShow);
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
  if (isNil(this.wishedTvShow.platform) || isNil(this.wishedTvShow.reason)  ) {
    this.validateForm = false
  } else  {
    this.validateForm = true;
    this.saveWishedTvShow(this.wishedTvShow);
  }
}

}
