import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LabsService } from '../../labs/state/labs.service';
import { Lab } from '../../labs/model';
import { sensorUrl, serverUrl } from 'src/environments/environment';

@Component({
  selector: 'app-lab1-page',
  templateUrl: './lab1-page.html',
  styleUrls: ['./lab1-page.scss']
})
export class Lab1PageComponent {

    lab: Lab;
    takenUntil = null;
    measurementStarted = false;
    measurementResult = [];
    cameraUrl =  `${serverUrl}/cam/0`;
    sensorUrl = `${sensorUrl}/spectrometer`;
    labId = 1;

    constructor(
      private labService: LabsService,
      private router: Router
    ) {
      if (this.router.getCurrentNavigation().extras.state) {
        this.lab = this.router.getCurrentNavigation().extras.state.lab;
        this.takenUntil = this.lab.users[0].LabUser.takenUntil;
      } else if (!this.lab) {
        this.labService.getLab(this.labId).subscribe(lab => {
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
