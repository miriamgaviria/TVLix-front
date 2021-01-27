import { Component, OnInit } from '@angular/core';

import  isNil from 'lodash/isNil';

import { TvShowApi } from '../../models/tvShowApi.model';
import { TvShowsService } from './../../services/tvShows.service';
import { TvShow } from '../../models/tvShow.model';

import Images from '../../../assets/imagesUrl.json';
import Texts from '../../../assets/texts.json';
import WatchedStatus from '../../../assets/configs/watchedStatus.json'

import { UserTvShow } from './../../models/userTvShow.model';

@Component({
  selector: 'app-watching-tv-shows',
  templateUrl: './watching-tv-shows.component.html',
  styleUrls: ['./watching-tv-shows.component.css']
})
export class WatchingTvShowsComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
