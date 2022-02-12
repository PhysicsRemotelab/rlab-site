import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersConfig } from './users.config';
import { User } from '../model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private usersConfig: UsersConfig
  ) { }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersConfig.getUsersEndpoint(), user);
  }
}
