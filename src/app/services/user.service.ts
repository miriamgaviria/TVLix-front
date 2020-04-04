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

  // getUserByUserName(user: User): Observable<User> {
  //   return this.http.get<User>(this.urlEndPointUser, user, {headers: this.httpHeaders});
  // }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(this.urlEndPointUser, user, {headers: this.httpHeaders});
  }
}