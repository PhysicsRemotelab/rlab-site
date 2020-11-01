import { Injectable } from '@angular/core';
import { serverUrl } from '../../../../../auth_config.json';

@Injectable({
    providedIn: 'root',
})
export class LabsConfig {

    getLabsEndpoint(): string {
        return `/api/labs`;
    }
}
