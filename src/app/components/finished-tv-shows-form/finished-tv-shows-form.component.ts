import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import  isNil from 'lodash/isNil';

import swal from'sweetalert2';

import { TvShowApi } from '../../models/tvShowApi.model';
import { TvShowDTO } from './../../models/tvShowDTO.model';
import { UserTvShowDTO } from '../../models/userTvShowDTO.model';

import { TvShowsService } from './../../services/tvShows.service';
import { UserService } from 'src/app/services/user.service';
import { UserTvShowsService } from 'src/app/services/userTvShows.service';

import Images from '../../../assets/imagesUrl.json';
import Texts from '../../../assets/texts.json';
import WatchedStatus from '../../../assets/configs/watchedStatus.json';

@Component({
  selector: 'app-finished-tv-shows-form',
  templateUrl: './finished-tv-shows-form.component.html',
  styleUrls: ['./finished-tv-shows-form.component.css']
})
export class FinishedTvShowsFormComponent implements OnInit {
  images: any = Images;
  texts: any = Texts;
  watchedStatus: any = WatchedStatus;

  isLoading: boolean = true;
  isTvShowDB: boolean;
  isTvShowApi: boolean;
  isUserTvShowStatusDB: boolean;
  isUserTvShowDB: boolean;



  finishedTvShow: UserTvShowDTO = new UserTvShowDTO();
  finishedTvShows: UserTvShowDTO[];
  tvShow: any;
  tvShowApi: TvShowApi;
  tvShowDTO: TvShowDTO = new TvShowDTO();
  tvShowId: string;

  userId: any;
  userTvShows: UserTvShowDTO[];

  validateForm: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tvShowsService: TvShowsService,
    private userService: UserService,
    private userTvShowsService: UserTvShowsService,
    ) { }

  ngOnInit(): void {
    this.tvShowId = this.route.snapshot.paramMap.get("tvShowId");
    this.userId = sessionStorage.getItem('userId');
    if (isNil(this.userId)) this.router.navigate(['/login']);

    this.isUserTvShow();
  }

  private getTvShowData = () => {
    this.tvShowsService.getTvShowByIdDB(this.tvShowId).subscribe(
      (newData) => {
        if (!isNil(newData)) {
          this.tvShow = newData;
          this.isTvShowDB = true;
        } else {
          this.getTvShowFromApi();
        }})
  }

  private getTvShowFromApi = () => {
    this.tvShowsService.getTvShowApi(this.tvShowId).subscribe(
      (newData) => {
        this.parseTvShowApi(newData.tvShow);
        this.isTvShowApi = true;
      }
    )
  }

  private getFinishedTvShowData = finishedTvShow => {
    this.finishedTvShow.watchedStatus = this.watchedStatus.finished;

    this.userService.getUserById(this.userId).subscribe(
      response => {
        this.finishedTvShow.user = response;
      }
    )

    this.finishedTvShow.tvShow = this.tvShow;
  }

  private isUserTvShow = () => {
    this.userTvShowsService.getUserAllTvShows(this.userId).subscribe(
      (data) => {
        if (!isNil(data)) {
          this.userTvShows = data;
          this.isUserTvShowStatusDB = this.userTvShows.some(userTvShow => userTvShow.tvShow.id.toString() === this.tvShowId.toString() && userTvShow.watchedStatus === this.watchedStatus.finished);
          if (this.isUserTvShowStatusDB) {
            swal.fire({
              background: 'rgb(211,211,211)',
              icon: 'error',
              title: 'Oops...',
              text: 'La serie ya está en tu lista de series que quieres ver'
            })
          }

          this.isUserTvShowDB = this.userTvShows.some(userTvShow => userTvShow.tvShow.id.toString() === this.tvShowId.toString());

          !this.isUserTvShowStatusDB && this.getTvShowData();
        } else {
          this.getTvShowData();
        }
        this.isLoading = false;
      }
    )
  }

  public onSubmit(): void {
    if (isNil(this.finishedTvShow.rate) || isNil(this.finishedTvShow.opinion)) {
      this.validateForm = false
    } else  {
      this.validateForm = true;
      this.saveUpdateFinishedTvShow(this.finishedTvShow);
    }
  }

  private parseTvShowApi = tvShowApi => {
    return(
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
  )};

  public saveUpdateFinishedTvShow(finishedTvShow: UserTvShowDTO) {
    !this.isUserTvShowDB && !this.isUserTvShowStatusDB && this.saveUserTvShow(finishedTvShow);

    this.isUserTvShowDB && this.updateUserTvShow(finishedTvShow);
  }

  private saveUserTvShow = (finishedTvShow: UserTvShowDTO) => {
    this.getFinishedTvShowData(finishedTvShow);

    setTimeout (() => {
      this.userTvShowsService.postUserTvShow(this.finishedTvShow).subscribe(
        response => {
          swal.fire({
            background: 'rgb(211,211,211)',
            icon: 'success',
            title: 'Ok',
            text: 'Serie guardada en tu perfil'
          }),
          this.router.navigate(['/finishedTvShows']);
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

  private updateUserTvShow = (finishedTvShow: UserTvShowDTO) => {
    this.getFinishedTvShowData(finishedTvShow);

    setTimeout (() => {
      this.userTvShowsService.updateUserTvShow(this.finishedTvShow).subscribe(
        response => {
          swal.fire({
            background: 'rgb(211,211,211)',
            icon: 'success',
            title: 'Ok',
            text: 'Serie guardada en tu perfil'
          }),
          this.router.navigate(['/finishedTvShows']);
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
}
