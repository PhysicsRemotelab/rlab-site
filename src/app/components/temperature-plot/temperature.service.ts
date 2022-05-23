import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class CameraPixelService {
    constructor(private http: HttpClient) {}

    getCameraPixels(cameraUrlPixels: string, lineNumber: number): Observable<any> {
        return this.http.get(`${cameraUrlPixels}/${lineNumber}`);
    }
}
