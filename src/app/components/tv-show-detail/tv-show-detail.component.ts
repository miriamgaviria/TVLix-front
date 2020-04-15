import { TvShowApi } from '../../models/tvShowApi.model';
import { Component, OnInit } from '@angular/core';

import { TvShowsService } from './../../services/tvShows.service';
import { TvShow } from '../../models/tvShow.model';

@Component({
  selector: 'app-tv-show-detail',
  templateUrl: './tv-show-detail.component.html',
  styleUrls: ['./tv-show-detail.component.css']
})
export class TvShowDetailComponent implements OnInit {
    
  isLoading: boolean = true;
  originalPicture: boolean = true;
  smallPicturesSrc: string;
  tvShowApi: TvShowApi;
  tvShowDetail: TvShow;
  tvShowId: any;

  constructor(private tvShowsService: TvShowsService) { }

  ngOnInit(): void {
    this.tvShowId = localStorage.getItem('tvShowId'); 
    
    this.tvShowsService.getTvShow(this.tvShowId).subscribe(
      (newData) => {
        this.tvShowApi = newData;
        this.tvShowDetail = this.tvShowApi.tvShow
        console.log('tvShowApi', this.tvShowDetail)
        this.isLoading = false;
      }
    )
  }

  onSmallImages(pictures){
    console.log('pictures', pictures)
    this.originalPicture = false;
    this.smallPicturesSrc = pictures;
  }

}
