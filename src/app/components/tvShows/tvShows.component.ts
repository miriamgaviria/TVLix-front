import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import swal from'sweetalert2';

import { TvShowsList } from './../../models/tvShowsList.model';
import { TvShow } from '../../models/tvShow.model';

import { TvShowsService } from './../../services/tvShows.service';

import Images from '../../../assets/imagesUrl.json';
import Texts from '../../../assets/texts.json';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.css']
})

export class TvShowsComponent implements OnInit {
  images: any = Images;
  texts: any = Texts;

  imageTvShow: boolean;
  isLoading: boolean = true;
  pageNumber: number;
  previousPage: boolean;
  searchName: string;
  tvShowsForHome: TvShowsList;

  constructor(private tvShowsService: TvShowsService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadTvShows(1);
  }

  loadTvShows(page){
    this.tvShowsService.getTvShowList(page).subscribe(
      (data) => {
        this.tvShowsForHome = data;
        this.isLoading = false;
      }
    )
  }

  goToDetail(tvShowId) {
    localStorage.setItem('tvShowId', tvShowId);
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

  onSearch(event: any){
    this.searchName = event.target.searchName.value;
    let searchNameArray = this.searchName.split(" ");
    if (searchNameArray.length>1){
      swal.fire({
        background: 'rgb(211,211,211)',
        icon: 'error',
        title: 'Oops...',
        text: 'La búsqueda contiene más de una palabra'
      })
    } else {
      this.router.navigate(['/foundTvShows/', this.searchName]);
    }
  }

  setIdTvShow (tvShowId) {
    localStorage.setItem('tvShowId', tvShowId);
  }
}
