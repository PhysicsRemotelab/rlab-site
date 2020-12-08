import { Injectable } from '@angular/core';
import { serverUrl } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LabsConfig {

    getLabEndpoint(id: number): string {
        return `${serverUrl}/api/labs/${id}`;
    }

    getLabsEndpoint(): string {
        return `${serverUrl}/api/labs`;
    }

    getUseLabsEndpoint(): string {
        return `${serverUrl}/api/labs/use`;
    }

    getFreeLabEndpoint(): string {
        return `${serverUrl}/api/labs/free`;
    }
}
