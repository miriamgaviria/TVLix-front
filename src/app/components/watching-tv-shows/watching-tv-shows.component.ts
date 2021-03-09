import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import swal from'sweetalert2';

import { UserTvShowDTO } from '../../models/userTvShowDTO.model';

import { UserTvShowsService } from 'src/app/services/userTvShows.service';

import Images from '../../../assets/imagesUrl.json';
import Texts from '../../../assets/texts.json';
import WatchedStatus from '../../../assets/configs/watchedStatus.json'

@Component({
  selector: 'app-watching-tv-shows',
  templateUrl: './watching-tv-shows.component.html',
  styleUrls: ['./watching-tv-shows.component.scss']
})
export class WatchingTvShowsComponent implements OnInit {
  images: any = Images;
  texts: any = Texts;
  watchedStatus: any = WatchedStatus;

  searchName: string;

  watchingTvShows: UserTvShowDTO[];
  watchingTvShowIdToDelete: number;

  isLoading: boolean = true;
  isSearched: boolean = false;

  userId: string;

  constructor(
    private router: Router,
    private userTvShowsService: UserTvShowsService
  ) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    if (isNil(this.userId)) this.router.navigate(['/login']);
    this.watchingTvShows = [];
    this.loadWatchingTvShows();
  }

  loadWatchingTvShows = () => {
    this.userTvShowsService.getUserTvShowsByStatus(this.userId, this.watchedStatus.watching).subscribe(
      (data) => {
        this.watchingTvShows = data;
        this.isLoading = false;
      }
    )
  }

  deleteTvShow = () => {
    this.isLoading = true;
    this.userTvShowsService.deleteUserTvShowById(this.watchingTvShowIdToDelete).subscribe(
      (data) => {
        swal.fire({
          background: 'rgb(211,211,211)',
          icon: 'success',
          title: 'Serie eliminada'
        }),
        this.isLoading = false;
        this.router.navigate(['/watchingTvShows']);
      },
      (error) => {
        console.log('error')
        swal.fire({
          background: 'rgb(211,211,211)',
          icon: 'error',
          title: 'Oops...',
          text: 'No se ha podido eliminar la serie'
        })
        this.isLoading = false;
      }
    );
  }

  onSearch(event: any){
    this.isLoading = true;
    this.searchName = event.target.searchName.value;
    if (isEmpty(this.searchName)) {
      this.watchingTvShows;
    } else {
      this.watchingTvShows = this.watchingTvShows.filter(watchingTvShow =>  watchingTvShow.tvShow.name.toLowerCase().includes(this.searchName.toLowerCase()));
    }
    this.isLoading = false;
    this.isSearched = true;
  }

  setWatchingTvShowIdToDelete = watchingTvShowIdToDelete => {
    this.watchingTvShowIdToDelete = watchingTvShowIdToDelete;
  }
}
