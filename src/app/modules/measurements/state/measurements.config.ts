import { Injectable } from '@angular/core';
import { serverUrl } from '../../../../../env.json';

@Injectable({
    providedIn: 'root',
})
export class MeasurementsConfig {

    getMeasurementsEndpoint(): string {
        return `${serverUrl}/api/measurements`;
    }
}
