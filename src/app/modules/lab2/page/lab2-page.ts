import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Lab } from '../../labs/model';
import { LabsService } from '../../labs/state/labs.service';
import { lab2Camera, lab2Sensor } from 'src/environments/environment';

@Component({
  selector: 'app-lab2-page',
  templateUrl: './lab2-page.html',
  styleUrls: ['./lab2-page.scss']
})
export class Lab2PageComponent {

    lab: Lab;
    takenUntil = null;
    measurementStarted = false;
    measurementResult = [];
    cameraUrl = lab2Camera;
    sensorUrl = lab2Sensor;
    labId = 2;

    constructor(
      private labService: LabsService,
      private router: Router
    ) {
      if (this.router.getCurrentNavigation().extras.state) {
        this.lab = this.router.getCurrentNavigation().extras.state.lab;
        //this.takenUntil = this.lab.users[0].LabUser.takenUntil;
      } else if (!this.lab) {
        this.labService.getLab(this.labId).subscribe(lab => {
          this.lab = lab;
          //this.takenUntil = this.lab.users[0].LabUser.takenUntil;
        });
      }
    }

    getData($event: any): void {
      this.measurementResult = $event;
    }

    getMeasurementStarted($event: boolean): void {
      this.measurementStarted = $event;
    }
}
