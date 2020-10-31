import { Injectable } from '@angular/core';
import { serverUrl } from '../../../../../auth_config.json';

@Injectable({
    providedIn: 'root',
})
export class MeasurementsConfig {

    getMeasurementsEndpoint(): string {
        return `${serverUrl}/measurements`;
    }
}
