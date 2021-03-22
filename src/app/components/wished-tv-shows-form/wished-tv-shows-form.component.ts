import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import  isNil from 'lodash/isNil';

import swal from'sweetalert2';

import { TvShowApi } from '../../models/tvShowApi.model';
import { TvShowDTO } from 'src/app/models/tvShowDTO.model';
import { UserTvShowDTO } from '../../models/userTvShowDTO.model';

import { TvShowsService } from './../../services/tvShows.service';
import { UserService } from 'src/app/services/user.service';
import { UserTvShowsService } from 'src/app/services/userTvShows.service';

import Images from '../../../assets/imagesUrl.json';
import Texts from '../../../assets/texts.json';
import WatchedStatus from '../../../assets/configs/watchedStatus.json';
import StreamingPlatforms from '../../../assets/configs/streamingPlatforms.json'


@Component({
  selector: 'app-wished-tv-shows-form',
  templateUrl: './wished-tv-shows-form.component.html',
  styleUrls: ['./wished-tv-shows-form.component.scss']
})
export class WishedTvShowsFormComponent implements OnInit {
  images: any = Images;
  texts: any = Texts;
  watchedStatus: any = WatchedStatus;
  streamingPlatforms: any = StreamingPlatforms;

  isLoading: boolean = true;
  isUserTvShowStatusDB: boolean;
  isUserTvShowDB: boolean;
  isTvShowDB: boolean;
  isTvShowApi: boolean;

  tvShowApi: TvShowApi;
  tvShowDB: TvShowDTO;
  tvShow: any;
  wishedTvShow: UserTvShowDTO = new UserTvShowDTO();
  wishedTvShows: UserTvShowDTO[];

  userTvShows: UserTvShowDTO[];

  tvShowId: string;
  userId: any;

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
          this.isUserTvShowStatusDB = this.userTvShows.some(userTvShow => userTvShow.tvShow.id.toString() === this.tvShowId.toString() && userTvShow.watchedStatus === this.watchedStatus.wished);
          if (this.isUserTvShowStatusDB) {
            swal.fire({
              background: 'rgb(211,211,211)',
              icon: 'error',
              title: 'Oops...',
              text: 'La serie ya está en tu lista de series que quieres ver'
            })
            this.router.navigate(['/wishedTvShows'])
          }

          this.isUserTvShowDB = this.userTvShows.some(userTvShow => userTvShow.tvShow.id.toString() === this.tvShowId.toString() && (userTvShow.watchedStatus === this.watchedStatus.watching || userTvShow.watchedStatus === this.watchedStatus.finished ));
          if (this.isUserTvShowDB) {
            swal.fire({
              background: 'rgb(211,211,211)',
              icon: 'error',
              title: 'Oops...',
              text: 'No puede añadir esta serie a la lista de series para ver, porque ya la está viendo o la ha visto'
            }),
            this.router.navigate(['/wishedTvShows'])
          }


          !this.isUserTvShowStatusDB && !this.isUserTvShowDB && this.getTvShowData();
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
    if (isNil(this.wishedTvShow.platform) || isNil(this.wishedTvShow.reason)  ) {
      this.validateForm = false
    } else  {
      this.validateForm = true;
      this.saveUpdateWishedTvShow();
    }
  }

  private saveUserTvShow = () => {
    this.wishedTvShow.watchedStatus = this.watchedStatus.wished;

    this.userService.getUserById(this.userId).subscribe(
      response => {
        this.wishedTvShow.user = response;
      }
    )

    this.wishedTvShow.tvShow = this.tvShow;

    setTimeout (() => {
      this.userTvShowsService.postUserTvShow(this.wishedTvShow).subscribe(
        response => {
          swal.fire({
            background: 'rgb(211,211,211)',
            icon: 'success',
            title: 'Ok',
            text: 'Serie guardada en tu perfil'
          }),
          this.router.navigate(['/wishedTvShows']);
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

  public saveUpdateWishedTvShow() {
    !this.isUserTvShowDB && !this.isUserTvShowStatusDB && this.saveUserTvShow();
  }
}
