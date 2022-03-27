import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UsersConfig {
    getUsersEndpoint(): string {
        return `${apiUrl}/users`;
    }
}
