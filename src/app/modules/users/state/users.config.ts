import { Injectable } from '@angular/core';
import { serverUrl } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UsersConfig {

    getUsersEndpoint(): string {
        return `${serverUrl}/users`;
    }
}
