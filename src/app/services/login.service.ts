import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlEndPointLogin: string = 'http://localhost:81/isAdmin';
  
  private httpHeaders = new HttpHeaders ({'Content-type': 'application/json'})
  constructor(private http: HttpClient) { }

  checkIsUser(user: User): Observable<any> {
    return this.http.get<number>(this.urlEndPointLogin, {headers: this.httpHeaders});
  }
}