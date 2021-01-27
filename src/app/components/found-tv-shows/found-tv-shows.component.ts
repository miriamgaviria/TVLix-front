import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { TvShowsList } from './../../models/tvShowsList.model';
import { TvShowsService } from './../../services/tvShows.service';
import { TvShow } from '../../models/tvShow.model';

import Images from '../../../assets/imagesUrl.json';
import Texts from '../../../assets/texts.json';

@Component({
  selector: 'app-found-tv-shows',
  templateUrl: './found-tv-shows.component.html',
  styleUrls: ['./found-tv-shows.component.css']
})
export class FoundTvShowsComponent implements OnInit {
  images: any = Images;
  texts: any = Texts;

  imageTvShow: boolean;
  isLoading: boolean = true;
  pageNumber: number;
  previousPage: boolean;
  searchName: string;
  noFoundTvShows: boolean;
  foundTvShows: TvShowsList;
  reFoundTvShows: any;
  tvShowDetail: TvShow;

  constructor(
    private tvShowsService: TvShowsService,
    private router: Router) { }

  ngOnInit(): void {
    this.searchName = localStorage.getItem('searchName');
    localStorage.remove('searchName')
    this.loadTvShows(1);
  }

  loadTvShows(page){
    this.tvShowsService.getTvShowSearch(page, this.searchName).subscribe(
      (data) => {
        this.foundTvShows = data;
        console.log('lista de series encontradas', data);
        this.isLoading = false;
        if(this.foundTvShows.tv_shows.length === 0){
          this.noFoundTvShows = true;
        } else {
          this.noFoundTvShows = false;
        }
      }
    )
  }

  goToDetail(tvShowId) {
    localStorage.setItem('tvShowId', tvShowId);
    this.router.navigate(['/tvShowDetail']);
  }

  goToNextTvShows(page){
    console.log('page clickada', page)
    this.loadTvShows(page + 1);
    this.previousPage = true;
  }

  goToPreviousTvShows(page){
    this.loadTvShows(page - 1);
    this.previousPage = true;
  }

  setIdTvShow (tvShowId) {
    localStorage.setItem('tvShowId', tvShowId);
  }

  // onSearch(event: any){
  //   this.searchName = event.target.searchName.value;
  //   localStorage.setItem('searchName', this.searchName);
  //   this.reFoundTvShows = this.foundTvShows.tv_shows.filter(tv_show => tv_show.name.includes(this.searchName));
  //   console.log('this.reFoundTvShows', this.reFoundTvShows)
  // }
}
