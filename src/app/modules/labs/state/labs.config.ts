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

    checkBookingEndpoint(labId: number): any {
        return `${apiUrl}/booking/${labId}`;
    }

    createBookingEndpoint(): string {
        return `${apiUrl}/booking`;
    }

    cancelBookingEndpoint(labId: number): string {
        return `${apiUrl}/booking/cancel/${labId}`;
    }
}
