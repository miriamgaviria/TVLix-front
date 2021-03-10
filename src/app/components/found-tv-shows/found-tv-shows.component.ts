import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { TvShowsList } from './../../models/tvShowsList.model';
import { TvShowsService } from './../../services/tvShows.service';

import Images from '../../../assets/imagesUrl.json';
import Texts from '../../../assets/texts.json';

@Component({
  selector: 'app-found-tv-shows',
  templateUrl: './found-tv-shows.component.html',
  styleUrls: ['./found-tv-shows.component.scss']
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

  constructor(
    private route: ActivatedRoute,
    private tvShowsService: TvShowsService,
    private router: Router) { }

  ngOnInit(): void {
    this.searchName = this.route.snapshot.paramMap.get("searchName");
    this.loadTvShows(1);
  }

  loadTvShows(page){
    this.tvShowsService.getTvShowSearch(page, this.searchName).subscribe(
      (data) => {
        this.foundTvShows = data;
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
    this.router.navigate(['/tvShowDetail/', tvShowId]);
  }

  goToNextTvShows(page){
    this.loadTvShows(page + 1);
    this.previousPage = true;
  }

  goToPreviousTvShows(page){
    this.loadTvShows(page - 1);
    this.previousPage = true;
  }
}
