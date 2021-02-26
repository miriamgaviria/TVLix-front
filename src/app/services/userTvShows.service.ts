import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserTvShowDTO } from '../models/userTvShowDTO.model';

@Injectable({
  providedIn: 'root'
})
export class UserTvShowsService {

  private urlEndPointUserTvShow: string = 'http://localhost:81/user_tv_shows/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  postUserTvShow(userTvShowDTO: UserTvShowDTO) {
    console.log('UserTvShowDTO', userTvShowDTO)
    this.http.post<UserTvShowDTO>(this.urlEndPointUserTvShow, userTvShowDTO, this.httpOptions)
  }

  getUserTvShowsByStatus(userId, watchedStatus): Observable<any> {
    return this.http.get<any>(this.urlEndPointUserTvShow + userId + "/" + watchedStatus, this.httpOptions);
  }

  deleteUserTvShowById (id: number): Observable<any>{
    console.log('id', id)
    return this.http.delete(this.urlEndPointUserTvShow + id)
  }

  // getTvShows(): Observable<TvShows[]> {
  //   return of(TVSHOWS);
  // }

  // getTvShowList(pageNumber): Observable<TvShowsList> {
  //   return this.http.get<TvShowsList>(this.urlEndPointTvShowList + pageNumber);
  // }

  // getTvShow(tvShowId): Observable<TvShowApi> {
  //   return this.http.get<TvShowApi>(this.urlEndPointTvShow + tvShowId);
  // }

  // getTvShowByIdDB(tvShowId): Observable<TvShowDTO> {
  //   return this.http.get<TvShowDTO>(this.urlEndPointTvShowSDB + "/" + tvShowId);
  }

