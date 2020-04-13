import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlEndPointUser: string = 'http://localhost:81/users';
  
  private httpHeaders = new HttpHeaders ({'Content-type': 'application/json'})
  constructor(private http: HttpClient) { }

  getUserByUserName (userName: string): Observable<any>{
    return this.http.get<any>(this.urlEndPointUser + "/" + userName, {headers: this.httpHeaders})
  }

  postUser(user: User): Observable<any> {
    return this.http.post<any>(this.urlEndPointUser, user, {headers: this.httpHeaders});
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<any>(this.urlEndPointUser, user, {headers: this.httpHeaders});
  }
}