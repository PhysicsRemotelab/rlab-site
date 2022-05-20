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

    getLab(code: string): Observable<Lab> {
        return this.http.get<Lab>(this.labsConfig.getLabEndpoint(code));
    }
}
