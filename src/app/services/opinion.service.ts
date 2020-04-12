import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Opinion } from '../models/opinion.model';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {

  private urlEndPointOpinion: string = 'http://localhost:81/opinions';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  // private httpHeaders = new HttpHeaders ({'Content-type': 'applicaion/json', 'charset':'utf8'})
  constructor(private http: HttpClient) { }

  getOpinionList(): Observable<any> {
    return this.http.get<any>(this.urlEndPointOpinion, this.httpOptions);
  }

  postOpinion(opinion: any): Observable<string> {
    return this.http.post<string>(this.urlEndPointOpinion, opinion, this.httpOptions)
  }

  // deleteOpinion(id: number): Observable<Opinion> {
  //   return this.http.delete<Opinion>(this.urlEndPointOpinion, id);
  // }  
}
