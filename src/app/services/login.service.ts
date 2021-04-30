import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlEndPointLogin: string = 'http://localhost:81/api/users/isUser';

  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });
  constructor(private http: HttpClient) {}

  checkIsUser(user: User): Observable<any> {
    return this.http.post<any>(this.urlEndPointLogin, user, { headers: this.httpHeaders });
  }
}
