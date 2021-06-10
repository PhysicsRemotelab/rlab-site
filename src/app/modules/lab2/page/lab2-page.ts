import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Lab } from '../../labs/model';
import { LabsService } from '../../labs/state/labs.service';
import { sensorUrl, serverUrl } from 'src/environments/environment';

@Component({
  selector: 'app-lab2-page',
  templateUrl: './lab2-page.html',
  styleUrls: ['./lab2-page.scss']
})
export class Lab2PageComponent {

    lab: Lab;
    takenUntil = null;
    measurementStarted = false;
    measurementSaved = false;
    measurementResult = [];
    cameraUrl =  `${serverUrl}/cam/1`;
    sensorUrl = `${sensorUrl}/gamma`;
    labId = 2;

    constructor(
      private labService: LabsService,
      private router: Router
    ) {
      if (this.router.getCurrentNavigation().extras.state) {
        this.lab = this.router.getCurrentNavigation().extras.state.lab;
        this.takenUntil = this.lab.users[0].LabUser.takenUntil;
      } else if (!this.lab) {
        this.labService.getLab(this.labId).subscribe(lab => {
          console.log(lab);
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
