import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BookingConfig {
    getBookingEndpoint(): string {
        return `${apiUrl}/booking`;
    }
}
