import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Opinion } from '../models/opinion.model';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {
  private urlEndPointOpinion: string = 'http://localhost:81/api/opinions';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getOpinionList(): Observable<any> {
    return this.http.get<any>(this.urlEndPointOpinion, this.httpOptions);
  }

  postOpinion(opinion: Opinion): Observable<string> {
    return this.http.post<string>(this.urlEndPointOpinion, opinion, this.httpOptions);
  }
}
