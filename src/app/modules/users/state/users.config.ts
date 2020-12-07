import { Injectable } from '@angular/core';
import { serverUrl } from '../../../../../env.json';

@Injectable({
    providedIn: 'root',
})
export class UsersConfig {

    getUsersEndpoint(): string {
        return `${serverUrl}/api/users`;
    }
}
