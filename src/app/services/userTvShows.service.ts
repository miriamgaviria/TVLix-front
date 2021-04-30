import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { UserTvShowDTO } from '../models/userTvShowDTO.model';

@Injectable({
  providedIn: 'root'
})
export class UserTvShowsService {
  private urlEndPointUserTvShow: string = 'http://localhost:81/user_tv_shows/';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getUserAllTvShows(userId): Observable<any> {
    return this.http.get<any>(this.urlEndPointUserTvShow + userId, this.httpOptions);
  }

  getUserTvShowsByStatus(userId, watchedStatus): Observable<any> {
    return this.http.get<any>(this.urlEndPointUserTvShow + userId + '/' + watchedStatus, this.httpOptions);
  }

  postUserTvShow(userTvShowDTO: UserTvShowDTO): Observable<any> {
    return this.http.post<UserTvShowDTO>(this.urlEndPointUserTvShow, userTvShowDTO, this.httpOptions);
  }

  updateUserTvShow(userTvShowDTO: UserTvShowDTO): Observable<any> {
    return this.http.put<UserTvShowDTO>(this.urlEndPointUserTvShow, userTvShowDTO, this.httpOptions);
  }

  deleteUserTvShowById(id: number): Observable<any> {
    return this.http.delete(this.urlEndPointUserTvShow + id);
  }
}
