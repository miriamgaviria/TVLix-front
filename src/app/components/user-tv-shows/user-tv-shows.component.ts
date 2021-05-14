import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

import isNil from 'lodash/isNil';
import sortBy from 'lodash/sortBy';

import { UserTvShowDTO } from '../../models/userTvShowDTO.model';

import { UserTvShowsService } from 'src/app/services/userTvShows.service';

import Images from '../../../assets/imagesUrl.json';
import Texts from '../../../assets/texts.json';
import WatchedStatus from '../../../assets/configs/watchedStatus.json';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-tv-shows',
  templateUrl: './user-tv-shows.component.html',
  styleUrls: ['./user-tv-shows.component.scss']
})
export class UserTvShowsComponent implements OnInit {
  images: any = Images;
  texts: any = Texts;
  watchedStatus: any = WatchedStatus;

  isLoading: boolean = true;
  isLargeFinishedUserTvShows: boolean;
  isLargeWatchingUserTvShows: boolean;
  isLargeWishedUserTvShows: boolean;

  finishedUserTvShows: UserTvShowDTO[];
  watchingUserTvShows: UserTvShowDTO[];
  wishedUserTvShows: UserTvShowDTO[];

  tvShowIdToDelete: number;

  searchName: string;

  userId: string;
  userName: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private userTvShowsService: UserTvShowsService
  ) {}

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('userName');
    this.userService.getUserByUserName(this.userName).subscribe(response => {
      sessionStorage.setItem('userId', response.id);
      this.userId = response.id;
    });
    this.checkIsLoged();
  }

  checkIsLoged = () => {
    if (isNil(this.userName)) {
      this.router.navigate(['/login']);
    } else {
      setTimeout(() => {
        this.onLoadUserTvShows();
      }, 500);
    }
  };

  deleteTvShow = () => {
    this.isLoading = true;
    this.userTvShowsService.deleteUserTvShowById(this.tvShowIdToDelete).subscribe(
      data => {
        swal.fire({
          background: 'rgb(211,211,211)',
          icon: 'success',
          title: 'Serie eliminada'
        }),
          (this.isLoading = false);
        this.onLoadUserTvShows();
      },
      error => {
        console.log('error');
        swal.fire({
          background: 'rgb(211,211,211)',
          icon: 'error',
          title: 'Oops...',
          text: 'No se ha podido eliminar la serie'
        });
        this.isLoading = false;
      }
    );
  };

  onLoadUserTvShows = () => {
    this.userTvShowsService.getUserTvShowsByStatus(this.userId, this.watchedStatus.watching).subscribe(data => {
      if (data.length > 2) this.isLargeWatchingUserTvShows = true;
      this.watchingUserTvShows = sortBy(data, 'date').reverse();
      this.watchingUserTvShows = data.slice(0, 1);
    });
    this.userTvShowsService.getUserTvShowsByStatus(this.userId, this.watchedStatus.wished).subscribe(data => {
      if (data.length > 2) this.isLargeWishedUserTvShows = true;
      this.wishedUserTvShows = sortBy(data, 'date').reverse();
      this.wishedUserTvShows = data.slice(0, 1);
    });
    this.userTvShowsService.getUserTvShowsByStatus(this.userId, this.watchedStatus.finished).subscribe(data => {
      if (data.length > 2) this.isLargeFinishedUserTvShows = true;
      this.finishedUserTvShows = sortBy(data, 'date').reverse();
      this.finishedUserTvShows = data.slice(0, 1);
    });
    this.isLoading = false;
  };

  onSearch(event: any) {
    this.searchName = event.target.searchName.value;
    this.router.navigate(['/foundTvShows/', this.searchName]);
  }

  setFinishedTvShowIdToDelete = tvShowIdToDelete => {
    this.tvShowIdToDelete = tvShowIdToDelete;
  };
}
