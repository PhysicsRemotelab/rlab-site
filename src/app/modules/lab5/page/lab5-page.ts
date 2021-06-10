import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LabsService } from '../../labs/state/labs.service';
import { Lab } from '../../labs/model';
import { sensorUrl, serverUrl } from 'src/environments/environment';

@Component({
  selector: 'app-lab5-page',
  templateUrl: './lab5-page.html',
  styleUrls: ['./lab5-page.scss']
})
export class Lab5PageComponent {

    lab: Lab;
    takenUntil = null;
    measurementStarted = false;
    measurementSaved = false;
    measurementResult = [];
    cameraUrl =  `${serverUrl}/cam/0`;
    sensorUrl = `${sensorUrl}/spectrometer2`;

    constructor(
      private labService: LabsService,
      private router: Router
    ) {
      if (this.router.getCurrentNavigation().extras.state) {
        this.lab = this.router.getCurrentNavigation().extras.state.lab;
        this.takenUntil = this.lab.users[0].LabUser.takenUntil;
      } else if (!this.lab) {
        this.labService.getLab(1).subscribe(lab => {
          this.lab = lab;
          this.takenUntil = this.lab.users[0].LabUser.takenUntil;
        });
      }
    }

    startMeasuremenet(): void {
      this.measurementStarted = true;
      this.measurementResult = [];
    }

    stopMeasuremenet(): void {
      this.measurementStarted = false;
    }

    getData($event: any): void {
      this.measurementResult = $event;
    }
}
