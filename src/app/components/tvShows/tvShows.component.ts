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

  isLoading: boolean = true;
  pageNumber: number;
  searchName: string;
  tvShowsForHome: TvShowsList;
  tvShowDetail: TvShow;

  constructor(private tvShowsService: TvShowsService,
    private router: Router) { }

  ngOnInit(): void {
    this.pageNumber = this.numeroAleatorio(1, 10)
    
    this.tvShowsService.getTvShowList(this.pageNumber).subscribe(
      // tvShowsForHome => this.tvShowsForHome = tvShowsForHome
      (data) => {
        console.log('data', data)
        this.tvShowsForHome = data;
        console.log('lista de series', data);
        console.log('src imagen', this.tvShowsForHome.tv_shows[0].image_thumbnail_path);
        this.isLoading = false;
      }
    )
  }

  goToDetail(tvShowId) {
    localStorage.setItem('tvShowId', tvShowId);
    this.router.navigate(['/tvShowDetail']);
  }

  onSearch(){
    console.log('searchName')
  }

  private numeroAleatorio(min, max) {
    console.log('Math.round(Math.random() * (max - min) + min)', Math.round(Math.random() * (max - min) + min))
    return Math.round(Math.random() * (max - min) + min);
  }
}
