import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

import { TvShow } from '../models/tvShow.model';
import { TvShowsList } from '../models/tvShowsList.model';
import { TVSHOWS } from '../model.js/tvShows.json';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {

  private urlEndPointTvShow: string = 'https://www.episodate.com/api/show-details?q=arrow';
  private urlEndPointTvShowList: string = 'https://www.episodate.com/api/most-popular?page=1';

  constructor(private http: HttpClient) { }

  // getTvShows(): Observable<TvShows[]> {
  //   return of(TVSHOWS);
  // }

  getTvShowList(): Observable<TvShowsList> {
    return this.http.get<TvShowsList>(this.urlEndPointTvShowList);
  }

  getTvShow(): Observable<TvShow> {
    return this.http.get<TvShow>(this.urlEndPointTvShow);
  }

  
}
