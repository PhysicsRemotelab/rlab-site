import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MeasurementsConfig } from './measurements.config';
import { Measurement } from '../model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class MeasurementsService {

  constructor(
    private http: HttpClient,
    private measurementsConfig: MeasurementsConfig
  ) { }

  getMeasurements(): Observable<Measurement[]> {
    return this.http.get<Measurement[]>(this.measurementsConfig.getMeasurementsEndpoint());
  }

  saveMeasurements(labId: number, result: string, name?: string): Observable<Measurement> {
    return this.http.post<Measurement>(this.measurementsConfig.getMeasurementsEndpoint(), { lab_id: labId, result, name });
  }

  deleteMeasurement(id: number): Observable<number> {
    return this.http.delete<number>(this.measurementsConfig.getMeasurementsEndpoint() + '/' + id);
  }

}
