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
  selector: 'app-finished-tv-shows',
  templateUrl: './finished-tv-shows.component.html',
  styleUrls: ['./finished-tv-shows.component.scss']
})
export class FinishedTvShowsComponent implements OnInit {
  images: any = Images;
  texts: any = Texts;
  watchedStatus: any = WatchedStatus;

  searchName: string;

  finishedTvShows: UserTvShowDTO[];
  finishedTvShowIdToDelete: number;

  isLoading: boolean = true;

  userId: string;

  constructor(
    private router: Router,
    private userTvShowsService: UserTvShowsService
  ) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    if (isNil(this.userId)) this.router.navigate(['/login']);
    this.finishedTvShows = [];
    this.loadFinishedTvShows();
  }

  loadFinishedTvShows = () => {
    this.userTvShowsService.getUserTvShowsByStatus(this.userId, this.watchedStatus.finished).subscribe(
      (data) => {
        this.finishedTvShows = data;
        this.isLoading = false;
      }
    )
  }

  deleteTvShow = () => {
    this.isLoading = true;
    this.userTvShowsService.deleteUserTvShowById(this.finishedTvShowIdToDelete).subscribe(
      (data) => {
        swal.fire({
          background: 'rgb(211,211,211)',
          icon: 'success',
          title: 'Serie eliminada'
        }),
        this.isLoading = false;
        this.router.navigate(['/tvShows']);
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
      this.finishedTvShows;
      console.log('here')
    } else {
      this.finishedTvShows = this.finishedTvShows.filter(finishedTvShow => finishedTvShow.tvShow.name.toLowerCase().includes(this.searchName.toLowerCase()));
    }
    this.isLoading = false;
  }

  setFinishedTvShowIdToDelete = finishedTvShowIdToDelete => {
    this.finishedTvShowIdToDelete = finishedTvShowIdToDelete;
  }
}
