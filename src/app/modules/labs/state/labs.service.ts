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

  useLab(id: number): Observable<any> {
    return this.http.put(this.labsConfig.getUseLabsEndpoint(), { id });
  }

  freeLab(id: number): Observable<any> {
    return this.http.put(this.labsConfig.getFreeLabEndpoint(), { id });
  }

}
