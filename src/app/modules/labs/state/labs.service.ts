import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LabsConfig } from './labs.config';
import { Lab } from '../model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class LabsService {
    constructor(private http: HttpClient, private labsConfig: LabsConfig) {}

    getLabs(): Observable<Lab[]> {
        return this.http.get<Lab[]>(this.labsConfig.getLabsEndpoint());
    }

    checkBooking(labId: number): Observable<any> {
        return this.http.get<any>(this.labsConfig.checkBookingEndpoint(labId));
    }

    createBooking(id: number): Observable<any> {
        return this.http.post(this.labsConfig.createBookingEndpoint(), { lab_id: id });
    }

    cancelBooking(labId: number): Observable<any> {
        return this.http.get(this.labsConfig.cancelBookingEndpoint(labId));
    }

    getLab(code: string): Observable<Lab> {
        return this.http.get<Lab>(this.labsConfig.getLabEndpoint(code));
    }
}
