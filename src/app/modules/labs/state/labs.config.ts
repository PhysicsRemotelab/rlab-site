import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LabsConfig {
    getLabEndpoint(code: string): string {
        return `${apiUrl}/labs/${code}`;
    }

    getLabsEndpoint(): string {
        return `${apiUrl}/labs`;
    }
}
