import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Opinion } from '../models/opinion.model';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {

  private urlEndPointOpinion: string = 'http://localhost:81/opinions';
  
  private httpHeaders = new HttpHeaders ({'Content-type': 'applicaion/json', 'charset':'utf8'})
  constructor(private http: HttpClient) { }

  getOpinionList(): Observable<any> {
    return this.http.get<any>(this.urlEndPointOpinion, {headers: this.httpHeaders});
  }

  postOpinion(opinion: Opinion): Observable <Opinion>{
    return this.http.post<Opinion>(this.urlEndPointOpinion, opinion, {headers: this.httpHeaders})
  }

  // deleteOpinion(id: number): Observable<Opinion> {
  //   return this.http.delete<Opinion>(this.urlEndPointOpinion, id);
  // }  
}
