import { Injectable } from '@angular/core';
import { serverUrl } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MeasurementsConfig {

    getMeasurementsEndpoint(): string {
        return `${serverUrl}/measurements`;
    }
}
