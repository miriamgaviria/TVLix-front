import { TvShowApi } from '../models/tvShowApi.model';
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

  private urlEndPointTvShow: string = 'https://www.episodate.com/api/show-details?q=';
  private urlEndPointTvShowList: string = 'https://www.episodate.com/api/most-popular?page=';
  private urlEndPointTvShowSearch: string = 'https://www.episodate.com/api/search?q=';

  constructor(private http: HttpClient) { }

  // getTvShows(): Observable<TvShows[]> {
  //   return of(TVSHOWS);
  // }

  // getTvShowList(): Observable<TvShowsList> {
  //   return this.http.get<TvShowsList>(this.urlEndPointTvShowList);
  // }

  getTvShowList(pageNumber): Observable<TvShowsList> {
    return this.http.get<TvShowsList>(this.urlEndPointTvShowList + pageNumber);
  }

  getTvShow(tvShowId): Observable<TvShowApi> {
    return this.http.get<TvShowApi>(this.urlEndPointTvShow + tvShowId);
  }

  getTvShowSearch(searchName): Observable<TvShow> {
    return this.http.get<TvShow>(this.urlEndPointTvShow + searchName +'&page=1');
  }

  
}
