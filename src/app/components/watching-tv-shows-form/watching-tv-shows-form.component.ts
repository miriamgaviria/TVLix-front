import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import  isNil from 'lodash/isNil';

import swal from'sweetalert2';

import { UserTvShowDTO } from '../../models/userTvShowDTO.model';
import { TvShowApi } from '../../models/tvShowApi.model';

import { TvShowsService } from 'src/app/services/tvShows.service';
import { UserService } from 'src/app/services/user.service';
import { UserTvShowsService } from 'src/app/services/userTvShows.service';

import Images from '../../../assets/imagesUrl.json';
import Texts from '../../../assets/texts.json';
import WatchedStatus from '../../../assets/configs/watchedStatus.json'

@Component({
  selector: 'app-watching-tv-shows-form',
  templateUrl: './watching-tv-shows-form.component.html',
  styleUrls: ['./watching-tv-shows-form.component.scss']
})
export class WatchingTvShowsFormComponent implements OnInit {
  images: any = Images;
  texts: any = Texts;
  watchedStatus: any = WatchedStatus;

  isLoading: boolean = true;
  isTvShowDB: boolean;
  isTvShowApi: boolean;
  isUserTvShowStatusDB: boolean;

  tvShow: any;
  tvShowApi: TvShowApi;
  tvShowId: string;
  watchingTvShow: UserTvShowDTO = new UserTvShowDTO();

  userId: any;

  userTvShows: UserTvShowDTO[];

  validateForm: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tvShowsService: TvShowsService,
    private userService: UserService,
    private userTvShowsService: UserTvShowsService) { }

  ngOnInit(): void {
    this.tvShowId = this.route.snapshot.paramMap.get("tvShowId");
    this.userId = sessionStorage.getItem('userId');
    if (isNil(this.userId)) this.router.navigate(['/login']);

    this.isUserTvShow();
  }

  private isUserTvShow = () => {
    this.userTvShowsService.getUserAllTvShows(this.userId).subscribe(
      (data) => {
        if (!isNil(data)) {
          this.userTvShows = data;
          let userTvShows = this.userTvShows.filter(userTvShow => userTvShow.tvShow.id.toString() === this.tvShowId.toString() && userTvShow.watchedStatus === this.watchedStatus.watching);
          this.isUserTvShowStatusDB = userTvShows.length !=0;
          this.tvShow = userTvShows[0].tvShow;
          this.isLoading = false;
        } else {
          this.getTvShowData();
        }
      }
    )
  }

  private getTvShowData = () => {
    this.tvShowsService.getTvShowByIdDB(this.tvShowId).subscribe(
      (newData) => {
        if (!isNil(newData)) {
          this.tvShow = newData;
          this.isTvShowDB = true;
          this.isLoading = false;
        } else {
          this.getTvShowFromApi();
        }})
  }

  private getTvShowFromApi = () => {
    this.tvShowsService.getTvShowApi(this.tvShowId).subscribe(
      (newData) => {
        this.parseTvShowApi(newData.tvShow);
        this.isTvShowApi = true;
        this.isLoading = false;
      }
    )
  }

  private parseTvShowApi = tvShowApi => (
    this.tvShow = {
      end_date: tvShowApi.end_date,
      episodes: tvShowApi.episodes.length - 1,
      genre: tvShowApi.genres.toString(),
      id: tvShowApi.id,
      image: tvShowApi.image_path,
      name: tvShowApi.name,
      rating: tvShowApi.rating,
      rating_count: tvShowApi.raing_count,
      runTime: tvShowApi.runtime,
      seasons: tvShowApi.episodes[tvShowApi.episodes.length - 1].season,
      sinopsis: tvShowApi.description,
      start_date: tvShowApi.start_date,
      status: tvShowApi.status
    }
  )

  public onSubmit(): void {
    if (isNil(this.watchingTvShow.seasonWatched) || isNil(this.watchingTvShow.episodeWatched)) {
      this.validateForm = false
    } else  {
      this.validateForm = true;
      this.saveUpdateWatchingTvShow();
    }
  }

  private saveUserTvShow = () => {
    setTimeout (() => {
      this.userTvShowsService.postUserTvShow(this.watchingTvShow).subscribe(
        response => {
          swal.fire({
            background: 'rgb(211,211,211)',
            icon: 'success',
            title: 'Ok',
            text: 'Serie guardada en tu perfil'
          }),
          this.router.navigate(['/watchingTvShows']);
        },
        error => {
          swal.fire({
            background: 'rgb(211,211,211)',
            icon: 'error',
            title: 'Oops...',
            text: 'No se ha podido guardar la serie'
          })
        }
      )
    }, 500);
  }

  private updateUserTvShow = () => {
    setTimeout (() => {
      this.userTvShowsService.updateUserTvShow(this.watchingTvShow).subscribe(
        response => {
          swal.fire({
            background: 'rgb(211,211,211)',
            icon: 'success',
            title: 'Ok',
            text: 'Serie actualizada en tu perfil'
          }),
          this.router.navigate(['/watchingTvShows']);
        },
        error => {
          swal.fire({
            background: 'rgb(211,211,211)',
            icon: 'error',
            title: 'Oops...',
            text: 'No se han podido actualizar los datos'
          })
        }
      )
    }, 500);
  }

  public saveUpdateWatchingTvShow() {
    this.watchingTvShow.watchedStatus = this.watchedStatus.watching;

    this.userService.getUserById(this.userId).subscribe(
      response => {
        this.watchingTvShow.user = response;
      }
    )

    this.watchingTvShow.tvShow = this.tvShow;

    if (!this.isUserTvShowStatusDB) {
      this.saveUserTvShow();
    } else {
      this.updateUserTvShow();
    }
  }
}
