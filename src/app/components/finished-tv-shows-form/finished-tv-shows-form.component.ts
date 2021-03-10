import { TvShowDTO } from './../../models/tvShowDTO.model';
import { Component, OnInit } from '@angular/core';

import  isNil from 'lodash/isNil';

import { TvShowApi } from '../../models/tvShowApi.model';
import { TvShowDetail } from '../../models/tvShowDetail.model';
import { UserTvShowDTO } from '../../models/userTvShowDTO.model';

import { TvShowsService } from './../../services/tvShows.service';
import { UserService } from 'src/app/services/user.service';
import { UserTvShowsService } from 'src/app/services/userTvShows.service';
import { Router } from '@angular/router';

import Images from '../../../assets/imagesUrl.json';
import Texts from '../../../assets/texts.json';
import WatchedStatus from '../../../assets/configs/watchedStatus.json';
import { ActivatedRoute } from '@angular/router';

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
  tvShow: TvShowDetail;

  finishedTvShow: UserTvShowDTO = new UserTvShowDTO();
  tvShowId: string;
  userId: any;

  tvShowDTO: TvShowDTO = new TvShowDTO();

  validateForm: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tvShowsService: TvShowsService,
    private userService: UserService,
    private userTvShowsService: UserTvShowsService,
    ) { }

  ngOnInit(): void {
    this.tvShowId = this.route.snapshot.paramMap.get("tvShowId");
    this.userId = sessionStorage.getItem('userId');
    if (isNil(this.userId)) this.router.navigate(['/login']);

    this.tvShowsService.getTvShow(this.tvShowId).subscribe(
      (newData) => {
        this.tvShowApi = newData;
        this.tvShow = this.tvShowApi.tvShow
        this.isLoading = false;
      }
    )
  }

    public saveFinishedTvShow(finishedTvShow: UserTvShowDTO) {
      this.finishedTvShow.watchedStatus = this.watchedStatus.finished;
      this.userService.getUserById(this.userId).subscribe(
        response => {
          this.finishedTvShow.user = response;
        }
      )

      this.tvShowsService.getTvShowByIdDB(this.tvShowId).subscribe(
        response => {
          this.finishedTvShow.tvShow = response;
        }
      )

      console.log('this.finishedTvShow', this.finishedTvShow);
      this.finishedTvShow.seasonWatched = '4';
      this.finishedTvShow.episodeWatched = '4';
      this.finishedTvShow.reason = 'asdfsadf';
      this.finishedTvShow.platform = 'asdfsadf';

      this.userTvShowsService.postUserTvShow(this.finishedTvShow);
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
