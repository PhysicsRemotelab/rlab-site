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

    getLabBookingEndpoint(labId: number): any {
        return `${apiUrl}/booking/${labId}`;
    }

    getUseLabsEndpoint(): string {
        return `${apiUrl}/booking`;
    }

    getFreeLabEndpoint(labId: number): string {
        return `${apiUrl}/booking/cancel/${labId}`;
    }
}
