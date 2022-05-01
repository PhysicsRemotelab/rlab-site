import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProfileConfig {
    getProfileEndpoint(): string {
        return `${apiUrl}/users`;
    }
}
