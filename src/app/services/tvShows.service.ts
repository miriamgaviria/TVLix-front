import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { TvShowApi } from '../models/tvShowApi.model';
import { TvShowDTO } from './../models/tvShowDTO.model';
import { TvShowsList } from '../models/tvShowsList.model';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {
  private urlEndPointTvShow: string = 'https://www.episodate.com/api/show-details?q=';
  private urlEndPointTvShowList: string = 'https://www.episodate.com/api/most-popular?page=';
  private urlEndPointTvShowSearch: string = 'https://www.episodate.com/api/search?q=';

  private urlEndPointTvShowsDB: string = 'http://localhost:81/tvShows';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}
  getTvShowApi(tvShowId): Observable<TvShowApi> {
    return this.http.get<TvShowApi>(this.urlEndPointTvShow + tvShowId);
  }

  getTvShowByIdDB(tvShowId): Observable<TvShowDTO> {
    return this.http.get<TvShowDTO>(this.urlEndPointTvShowsDB + '/' + tvShowId);
  }

  getTvShowList(pageNumber): Observable<TvShowsList> {
    return this.http.get<TvShowsList>(this.urlEndPointTvShowList + pageNumber);
  }

  getTvShowSearch(pageNumber, searchName): Observable<any> {
    return this.http.get<any>(this.urlEndPointTvShowSearch + searchName + '&page=' + pageNumber);
  }

  postTvShow(tvShowDTO: TvShowDTO): Observable<any> {
    return this.http.post<TvShowDTO>(this.urlEndPointTvShowsDB, tvShowDTO, this.httpOptions);
  }
}
