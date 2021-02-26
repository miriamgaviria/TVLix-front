import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import swal from'sweetalert2';

import Images from '../../../assets/imagesUrl.json';
import Texts from '../../../assets/texts.json';
import WatchedStatus from '../../../assets/configs/watchedStatus.json'
import TvShowStatus from '../../../assets/configs/tvShowStatus.json'

import { UserTvShowDTO } from '../../models/userTvShowDTO.model';
import { UserTvShowsService } from 'src/app/services/userTvShows.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watching-tv-shows',
  templateUrl: './watching-tv-shows.component.html',
  styleUrls: ['./watching-tv-shows.component.scss']
})
export class WatchingTvShowsComponent implements OnInit {
  images: any = Images;
  texts: any = Texts;
  watchedStatus: any = WatchedStatus;
  tvShowStatus: any = TvShowStatus;

  watchingTvShows: UserTvShowDTO[];
  watchingTvShow: UserTvShowDTO;
  watchingTvShowStatus: string;

  isLoading: boolean = true;

  constructor(
    private router: Router,
    private userTvShowsService: UserTvShowsService
  ) { }

  ngOnInit(): void {
    this.loadWatchingTvShows();
  }

  loadWatchingTvShows = () => {
    this.userTvShowsService.getUserTvShowsByStatus(12, this.watchedStatus.watching).subscribe(
      (data) => {
        this.watchingTvShows = data;
        this.isLoading = false;
        this.watchingTvShowStatus = this.tvShowStatus.watchingTvShow.tvShow.status;
      }
    )
  }

  deleteTvShow = watchingTvShowId => {
    this.isLoading = true;
    this.userTvShowsService.deleteUserTvShowById(watchingTvShowId).subscribe(
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
}
