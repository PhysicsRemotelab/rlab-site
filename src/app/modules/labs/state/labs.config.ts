import { Injectable } from '@angular/core';
import { serverUrl } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LabsConfig {

    getLabEndpoint(id: number): string {
        return `${serverUrl}/labs/${id}`;
    }

    getLabsEndpoint(): string {
        return `${serverUrl}/labs`;
    }

    checkLabBookingEndpoint(labId: number): any {
        return `${serverUrl}/booking/${labId}`;
    }

    getUseLabsEndpoint(): string {
        return `${serverUrl}/booking`;
    }

    getFreeLabEndpoint(labId: number): string {
        return `${serverUrl}/booking/cancel/${labId}`;
    }
}
