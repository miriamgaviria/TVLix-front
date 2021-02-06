import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlEndPointUser: string = 'http://localhost:81/users';
  private urlEndPointNewUser: string = 'http://localhost:81/users/newUser';

  private httpHeaders = new HttpHeaders ({'Content-type': 'application/json'})
  constructor(private http: HttpClient) { }

  getUserByUserName (userName: string): Observable<any>{
    return this.http.get<User>(this.urlEndPointUser + "/userName/" + userName, {headers: this.httpHeaders})
  }

  getUserById (id: number): Observable<any>{
    return this.http.get<User>(this.urlEndPointUser + "/" + id, {headers: this.httpHeaders})
  }

  postUser(user: User): Observable<any> {
    return this.http.post<User>(this.urlEndPointNewUser, user, {headers: this.httpHeaders});
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<User>(this.urlEndPointUser, user, {headers: this.httpHeaders});
  }
}
