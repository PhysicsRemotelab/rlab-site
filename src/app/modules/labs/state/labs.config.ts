import { Injectable } from '@angular/core';
import { serverUrl } from '../../../../../auth_config.json';

@Injectable({
    providedIn: 'root',
})
export class LabsConfig {

    getLabsEndpoint(): string {
        return `${serverUrl}/labs`;
    }

    getUseLabsEndpoint(): string {
        return `${serverUrl}/labs/use`;
    }

    getFreeLabEndpoint(): string {
        return `${serverUrl}/labs/free`;
    }
}
