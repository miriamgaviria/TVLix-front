import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import swal from'sweetalert2';

import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { UserTvShowDTO } from '../../models/userTvShowDTO.model';


import { UserTvShowsService } from 'src/app/services/userTvShows.service';

import Images from '../../../assets/imagesUrl.json';
import Texts from '../../../assets/texts.json';
import WatchedStatus from '../../../assets/configs/watchedStatus.json';

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
  searchName: string;

  finishedUserTvShows: UserTvShowDTO[];
  watchingUserTvShows: UserTvShowDTO[];
  wishedUserTvShows: UserTvShowDTO[];

  userId: string;

  constructor(
    private router: Router,
    private userTvShowsService: UserTvShowsService) { }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    if (isNil(this.userId)) this.router.navigate(['/login']);
    this.onLoadUserTvShows();
  }

  onLoadUserTvShows = () => {
    this.userTvShowsService.getUserTvShowsByStatus(this.userId, this.watchedStatus.watching).subscribe(
      (data) => {
        this.watchingUserTvShows = data.slice(0, 2);;
      }
    );
    this.userTvShowsService.getUserTvShowsByStatus(this.userId, this.watchedStatus.wished).subscribe(
      (data) => {
        this.wishedUserTvShows = data.slice(0, 2);;
      }
    );
    this.userTvShowsService.getUserTvShowsByStatus(this.userId, this.watchedStatus.finished).subscribe(
      (data) => {
        this.finishedUserTvShows = data.slice(0, 2);
      }
    )
    this.isLoading = false;
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
}
