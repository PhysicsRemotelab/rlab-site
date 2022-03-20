import { Injectable } from '@angular/core';
import { serverUrl } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LabsConfig {
    getLabEndpoint(code: string): string {
        return `${serverUrl}/labs/${code}`;
    }

    getLabsEndpoint(): string {
        return `${serverUrl}/labs`;
    }

    getLabBookingEndpoint(labId: number): any {
        return `${serverUrl}/booking/${labId}`;
    }

    getUseLabsEndpoint(): string {
        return `${serverUrl}/booking`;
    }

    getFreeLabEndpoint(labId: number): string {
        return `${serverUrl}/booking/cancel/${labId}`;
    }
}
