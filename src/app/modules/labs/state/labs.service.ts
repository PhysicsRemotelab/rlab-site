import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LabsConfig } from './labs.config';
import { Lab } from '../model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class LabsService {

  constructor(
    private http: HttpClient,
    private labsConfig: LabsConfig
  ) { }

  getLabs(): Observable<Lab[]> {
    return this.http.get<Lab[]>(this.labsConfig.getLabsEndpoint());
  }

  checklabBooking(labId: number): Observable<any> {
    return this.http.get<any>(this.labsConfig.checkLabBookingEndpoint(labId));
  }

  useLab(id: number): Observable<any> {
    return this.http.post(this.labsConfig.getUseLabsEndpoint(), { lab_id: id });
  }

  freeLab(labId: number): Observable<any> {
    return this.http.get(this.labsConfig.getFreeLabEndpoint(labId));
  }

  getLab(id: number): Observable<Lab> {
    return this.http.get<Lab>(this.labsConfig.getLabEndpoint(id));
  }
}
