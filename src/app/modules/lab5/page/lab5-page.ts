import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LabsService } from '../../labs/state/labs.service';
import { Lab } from '../../labs/model';
import { lab5Camera, lab5Sensor } from 'src/environments/environment';

@Component({
  selector: 'app-lab5-page',
  templateUrl: './lab5-page.html',
  styleUrls: ['./lab5-page.scss']
})
export class Lab5PageComponent {

  lab: Lab;
  takenUntil = null;
  measurementStarted = false;
  measurementResult = [];
  cameraUrl =  lab5Camera;
  sensorUrl = lab5Sensor;
  labId = 5;

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

  getData($event: any): void {
    this.measurementResult = $event;
  }

  getMeasurementStarted($event: boolean): void {
    this.measurementStarted = $event;
  }
}
