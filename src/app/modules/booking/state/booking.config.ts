import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BookingConfig {
    getBookingEndpoint(): string {
        return `${apiUrl}/booking`;
    }

    getTakenDaysEndpoint(labId: number): string {
        return `${apiUrl}/booking/taken_days/${labId}`;
    }
}
