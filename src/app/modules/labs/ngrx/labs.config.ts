import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LabsConfig {

    getLabsEndpoint(): string {
        return 'http://localhost:7000/labs';
    }

}
