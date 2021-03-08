import { Component, OnInit } from '@angular/core';

import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import swal from'sweetalert2';

import Images from '../../../assets/imagesUrl.json';
import Texts from '../../../assets/texts.json';
import WatchedStatus from '../../../assets/configs/watchedStatus.json'

import { UserTvShowDTO } from '../../models/userTvShowDTO.model';
import { UserTvShowsService } from 'src/app/services/userTvShows.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wished-tv-shows',
  templateUrl: './wished-tv-shows.component.html',
  styleUrls: ['./wished-tv-shows.component.scss']
})
export class WishedTvShowsComponent implements OnInit {
  images: any = Images;
  texts: any = Texts;
  watchedStatus: any = WatchedStatus;

  searchName: string;

  wishedTvShows: UserTvShowDTO[];
  wishedTvShowIdToDelete: number;

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
    this.wishedTvShows = [];
    this.loadWishedTvShows();
  }

  loadWishedTvShows = () => {
    this.userTvShowsService.getUserTvShowsByStatus(this.userId, this.watchedStatus.wished).subscribe(
      (data) => {
        this.wishedTvShows = data;
        this.isLoading = false;
      }
    )
  }



  deleteTvShow = () => {
    this.isLoading = true;
    this.userTvShowsService.deleteUserTvShowById(this.wishedTvShowIdToDelete).subscribe(
      (data) => {
        swal.fire({
          background: 'rgb(211,211,211)',
          icon: 'success',
          title: 'Serie eliminada'
        }),
        this.isLoading = false;
        this.router.navigate(['/wishedTvShows']);
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
      this.wishedTvShows;
      console.log('here')
    } else {
      this.wishedTvShows = this.wishedTvShows.filter(wishedTvShow => wishedTvShow.tvShow.name.toLowerCase().includes(this.searchName.toLowerCase()));
    }
    this.isLoading = false;
    this.isSearched = true;
  }

  setWishedTvShowIdToDelete = wishedTvShowIdToDelete => {
    this.wishedTvShowIdToDelete = wishedTvShowIdToDelete;
  }
}
