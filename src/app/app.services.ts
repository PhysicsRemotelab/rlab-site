import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { UsersConfig } from './modules/users/state/users.config';
import { User } from './modules/users/model';

@Injectable({
    providedIn: 'root'
})
export class AppServices {

  constructor(
    private http: HttpClient,
    private usersConfig: UsersConfig
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersConfig.getUsersEndpoint());
  }

  postUser(user: User): Observable<User[]> {
    return this.http.post<User[]>(this.usersConfig.getUsersEndpoint(), user);
  }

}
