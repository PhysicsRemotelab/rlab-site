import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Lab } from '../../labs/model';
import { LabsService } from '../../labs/state/labs.service';
import { sensorUrl, serverUrl } from 'src/environments/environment';

@Component({
  selector: 'app-lab4-page',
  templateUrl: './lab4-page.html',
  styleUrls: ['./lab4-page.scss']
})
export class Lab4PageComponent {

    selectedSensor = 'sensor1';
    sensors = [
      { value: 'sensor1', viewValue: 'Sensor 1' }
    ];
    lab: Lab;
    takenUntil = null;
    measurementStarted = false;
    measurementResult = [];
    cameraUrl =  `${serverUrl}/cam/0`;
    cameraUrlForPixels =  `${serverUrl}/camera/0`;
    sensorUrl = `${sensorUrl}/temperature`;
    labId = 4;

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

    getData($event: any): void {
      this.measurementResult = $event;
    }

    stopEvent(): void {
      this.measurementStarted = false;
    }

    startEvent(): void {
      this.measurementStarted = true;
      this.measurementResult = [];
    }

    getMeasurementStarted($event: boolean): void {
      this.measurementStarted = $event;
    }
}
