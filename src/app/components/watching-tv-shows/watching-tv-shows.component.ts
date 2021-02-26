import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import  isNil from 'lodash/isNil';

import { TvShowApi } from '../../models/tvShowApi.model';
import { TvShowsService } from './../../services/tvShows.service';
import { TvShow } from '../../models/tvShow.model';

import Images from '../../../assets/imagesUrl.json';
import Texts from '../../../assets/texts.json';
import WatchedStatus from '../../../assets/configs/watchedStatus.json'
import TvShowStatus from '../../../assets/configs/tvShowStatus.json'

import { UserTvShowDTO } from '../../models/userTvShowDTO.model';
import { UserTvShowsService } from 'src/app/services/userTvShows.service';

@Component({
  selector: 'app-watching-tv-shows',
  templateUrl: './watching-tv-shows.component.html',
  styleUrls: ['./watching-tv-shows.component.scss']
})
export class WatchingTvShowsComponent implements OnInit {
  images: any = Images;
  texts: any = Texts;
  watchedStatus: any = WatchedStatus;
  tvShowStatus: any = TvShowStatus;

  watchingTvShows: UserTvShowDTO[];
  watchingTvShow: UserTvShowDTO;
  watchingTvShowStatus: string;

  isLoading: boolean = true;

  constructor(
    private userTvShowsService: UserTvShowsService
  ) { }

  ngOnInit(): void {
    this.loadWatchingTvShows();
  }

  loadWatchingTvShows = () => {
    this.userTvShowsService.getUserTvShowsByStatus(12, this.watchedStatus.watching).subscribe(
      (data) => {
        console.log('data', data)
        this.watchingTvShows = data;
        this.isLoading = false;
        this.watchingTvShow = this.watchingTvShows[0];
        this.watchingTvShowStatus = this.tvShowStatus.watchingTvShow.tvShow.status;
      }
    )
  }


  deleteTvShow = () => {
    console.log('delete')
  }
}
