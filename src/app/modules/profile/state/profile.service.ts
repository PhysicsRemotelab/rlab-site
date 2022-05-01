import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ProfileConfig } from './profile.config';
import { User } from '../model';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    constructor(private http: HttpClient, private profileConfig: ProfileConfig) {}

    getProfile(): Observable<User> {
        return this.http.get<User>(this.profileConfig.getProfileEndpoint());
    }

    updateProfile(code: string, firstName: string, lastName: string): Observable<User> {
        return this.http.put<User>(this.profileConfig.getProfileEndpoint(), { code, firstName, lastName });
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(this.profileConfig.getProfileEndpoint(), user);
    }
}
