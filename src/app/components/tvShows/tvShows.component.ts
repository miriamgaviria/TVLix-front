import { Router } from '@angular/router';
import { TvShowsList } from './../../models/tvShowsList.model';
import { TvShowsService } from './../../services/tvShows.service';
import { TvShow } from '../../models/tvShow.model';

import { Component, OnInit } from '@angular/core';

// import Texts from '../../../assets/text.json';
// import Images from '../../../assets/images/';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.css']
})

export class TvShowsComponent implements OnInit {

  // texts: any = Texts.tvShows;
  // images: any = Images.tvShows;

  isLoading = true;
  

  tvShowsForHome: TvShowsList;
  tvShowDetail: TvShow;

  constructor(private tvShowsService: TvShowsService,
    private router: Router) { }

  ngOnInit(): void {
    
    this.tvShowsService.getTvShowList().subscribe(
      // tvShowsForHome => this.tvShowsForHome = tvShowsForHome
      (data) => {
        this.tvShowsForHome = data;
        console.log('lista de series', data);
        console.log('src imagen', this.tvShowsForHome.tv_shows[0].image_thumbnail_path);
        this.isLoading = false;
      }
    )

    this.tvShowsService.getTvShow().subscribe(
      (newData) => {
        this.tvShowDetail = newData;
        console.log('detalle de serie', newData);
      }
    )
  }

  goToDetail() {
    // localStorage.setItem('issueForDetail', JSON.stringify(tvShow));
    // this.notificationsUrl = '/notifications';
    // localStorage.setItem('previousUrl', this.notificationsUrl);

    this.router.navigate(['/tvShowDetail']);
  }
}
