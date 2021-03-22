import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import isNil from 'lodash/isNil';

import { TvShowDetail } from '../../models/tvShowDetail.model';

import { TvShowsService } from './../../services/tvShows.service';

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
  tvShowDetail: any;
  // tvShowDetail: TvShowDetail;
  tvShowId: any;

  constructor(
    private route: ActivatedRoute,
    private tvShowsService: TvShowsService) { }

  ngOnInit(): void {
    this.tvShowId = this.route.snapshot.paramMap.get("tvShowId");

    this.tvShowsService.getTvShowApi(this.tvShowId).subscribe(
      (newData) => {
        this.tvShowDetail = newData.tvShow
        isNil(this.tvShowDetail.image_thumbnail_path) || this.tvShowDetail.image_thumbnail_path === '' ? this.imageTvShow = false : this.imageTvShow = true;
      })
      this.isLoading = false;
  }

  public moreInformation(source){
    window.open(source, '_blank');
  }

  public onSmallImages(pictures){
    this.originalPicture = false;
    this.smallPicturesSrc = pictures;
  }
}
