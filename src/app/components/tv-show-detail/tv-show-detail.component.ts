import { Component, OnInit } from '@angular/core';

import { TvShowApi } from '../../models/tvShowApi.model';
import { TvShowsService } from './../../services/tvShows.service';
import { TvShow } from '../../models/tvShow.model';

import Images from '../../../assets/imagesUrl.json';
import Texts from '../../../assets/texts.json';

@Component({
  selector: 'app-tv-show-detail',
  templateUrl: './tv-show-detail.component.html',
  styleUrls: ['./tv-show-detail.component.css']
})
export class TvShowDetailComponent implements OnInit {
  images: any = Images;
  texts: any = Texts;

  isLoading: boolean = true;
  imageTvShow: boolean;
  originalPicture: boolean = true;
  smallPicturesSrc: string;
  tvShowApi: TvShowApi;
  tvShowDetail: TvShow;
  tvShowId: any;

  constructor(private tvShowsService: TvShowsService) { }

  ngOnInit(): void {
    this.tvShowId = localStorage.getItem('tvShowId');
    localStorage.removeItem('tvShowId');

    this.tvShowsService.getTvShow(this.tvShowId).subscribe(
      (newData) => {
        this.tvShowApi = newData;
        this.tvShowDetail = this.tvShowApi.tvShow
        this.isLoading = false;
        if (this.tvShowDetail.image_thumbnail_path === null || this.tvShowDetail.image_thumbnail_path === undefined || this.tvShowDetail.image_thumbnail_path === ''){
          this.imageTvShow = false;
        } else {
          this.imageTvShow = true;
        }
      }
    )
  }

  moreInformation(source){
    window.open(source, '_blank');
  }

  onSmallImages(pictures){
    this.originalPicture = false;
    this.smallPicturesSrc = pictures;
  }

  setIdTvShow (tvShowId) {
    localStorage.setItem('tvShowId', tvShowId);
  }
}
