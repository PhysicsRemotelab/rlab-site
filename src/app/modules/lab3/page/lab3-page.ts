import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Lab } from '../../labs/model';
import { LabsService } from '../../labs/state/labs.service';
import { lab3Camera, lab3Sensor } from 'src/environments/environment';

@Component({
  selector: 'app-lab3-page',
  templateUrl: './lab3-page.html',
  styleUrls: ['./lab3-page.scss']
})
export class Lab3PageComponent {

    selectedSensor = 'sensor1';
    sensors = [
      { value: 'sensor1', viewValue: 'Sensor 1'},
      { value: 'sensor2', viewValue: 'Sensor 2'},
      { value: 'sensor3', viewValue: 'Sensor 3'},
      { value: 'sensor4', viewValue: 'Sensor 4'},
      { value: 'sensor5', viewValue: 'Sensor 5'},
      { value: 'sensor6', viewValue: 'Sensor 6'}
    ];
    lab: Lab;
    takenUntil = null;
    measurementStarted = false;
    measurementSaved = false;
    measurementResult = [];
    cameraUrl = lab3Camera;
    sensorUrl = lab3Sensor;
    labId = 3;

    constructor(
      private labService: LabsService,
      private router: Router
    ) {
      if (this.router.getCurrentNavigation().extras.state) {
        this.lab = this.router.getCurrentNavigation().extras.state.lab;
        //this.takenUntil = this.lab.users[0].LabUser.takenUntil;
      } else if (!this.lab) {
        this.labService.getLab(this.labId).subscribe(lab => {
          console.log(lab);
          this.lab = lab;
         // this.takenUntil = this.lab.users[0].LabUser.takenUntil;
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
