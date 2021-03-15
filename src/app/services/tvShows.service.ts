import { TvShowApi } from '../models/tvShowApi.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

import { TvShowDetail } from '../models/tvShowDetail.model';
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

  constructor(private http: HttpClient) { }
  getTvShowList(pageNumber): Observable<TvShowsList> {
    return this.http.get<TvShowsList>(this.urlEndPointTvShowList + pageNumber);
  }

  getTvShowApi(tvShowId): Observable<TvShowApi> {
    return this.http.get<TvShowApi>(this.urlEndPointTvShow + tvShowId);
  }

  getTvShowSearch(pageNumber, searchName): Observable<any> {
    return this.http.get<any>(this.urlEndPointTvShowSearch + searchName + '&page=' + pageNumber);
  }

  getTvShowByIdDB(tvShowId): Observable<TvShowDTO> {
    return this.http.get<TvShowDTO>(this.urlEndPointTvShowsDB + "/" + tvShowId);
  }
}
