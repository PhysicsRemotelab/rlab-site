import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MeasurementsConfig {
    getMeasurementsEndpoint(): string {
        return `${apiUrl}/measurements`;
    }
}
