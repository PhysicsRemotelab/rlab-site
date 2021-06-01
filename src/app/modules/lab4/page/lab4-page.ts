import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Lab } from '../../labs/model';
import { LabsService } from '../../labs/state/labs.service';
import { MeasurementsService } from '../../measurements/state/measurements.services';
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
    measurementSaved = false;
    measurementResult = [];
    isSaveButtonDisabled = true;
    cameraUrl =  `${serverUrl}/cam/0`;
    sensorUrl = `${sensorUrl}/temperature`;

    constructor(
      private measurementsService: MeasurementsService,
      private labService: LabsService,
      private router: Router,
      private snackBarRef: MatSnackBar
    ) {
      if (this.router.getCurrentNavigation().extras.state) {
        this.lab = this.router.getCurrentNavigation().extras.state.lab;
        this.takenUntil = this.lab.users[0].LabUser.takenUntil;
      } else if (!this.lab) {
        this.labService.getLab(4).subscribe(lab => {
          console.log(lab);
          this.lab = lab;
          this.takenUntil = this.lab.users[0].LabUser.takenUntil;
        });
      }
    }

    saveMeasurements(): void {
      const result = this.measurementResult.map(res => {
        return [res.x, res.y];
      });
      this.measurementsService.saveMeasurements(this.lab.id, result.toString()).subscribe(res => {
        this.isSaveButtonDisabled = true;
      });
      this.snackBarRef.open('Saved!', 'Hide', {
        duration: 5000,
        verticalPosition: 'top',
        panelClass: ['snackbar']
      });
    }

    freeLab(): void {
      console.log(this.lab.id);
      this.labService.freeLab(this.lab.id).subscribe(result => {
        this.router.navigate([`/labs`]);
      });
    }

    getData($event: any): void {
      this.measurementResult = $event;
    }

    stopEvent(): void {
      this.measurementStarted = false;
      this.isSaveButtonDisabled = false;
    }

    startEvent(): void {
      this.measurementStarted = true;
      this.isSaveButtonDisabled = true;
      this.measurementResult = [];
    }

    getPixelValues(): void {
      console.log('Get pixel values');
      var image = new Image();
      image.crossOrigin = "Anonymous";
      image.src = 'http://localhost:3000/camera/0/static';
      const canvas = <HTMLCanvasElement> document.getElementById('canvas');
      const context = canvas.getContext('2d');
      const width = image.naturalWidth;
      const height = image.naturalHeight;
      canvas.width = width;
      canvas.height = height;
      context.drawImage(image, 0, 0, width, height);
      const imageData = context.getImageData(0, 0, width, height);
      console.log(imageData);
      const updatedImageData = this.rgbSplit(imageData, {
        rOffset: 0,
        gOffset: 0,
        bOffset: 0
      });
      context.putImageData(updatedImageData, 0, 0);
    }

    rgbSplit (imageData, options): ImageData {
      // destructure the offset values from options, default to 0
      const { rOffset = 0, gOffset = 0, bOffset = 0 } = options; 
      // clone the pixel array from original imageData
      const originalArray = imageData.data;
      const newArray = new Uint8ClampedArray(originalArray);
      // loop through every pixel and assign values to the offseted position
      for (let i = 0; i < originalArray.length; i += 4) {
        newArray[i + 0 + rOffset * 4] = originalArray[i + 0]; // 🔴
        newArray[i + 1 + gOffset * 4] = originalArray[i + 1]; // 🟢
        newArray[i + 2 + bOffset * 4] = originalArray[i + 2]; // 🔵
      }
      // return a new ImageData object
      return new ImageData(newArray, imageData.width, imageData.height);
    }

}
