import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MeasurementsService } from 'src/app/modules/measurements/state/measurements.services';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-save-measurement',
  templateUrl: './save-measurement.component.html',
  styleUrls: ['./save-measurement.component.scss']
})
export class SaveMeasurementComponent {

  @Input()
  labId: number;

  @Input()
  measurementResult: string;

  nameFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(
    private measurementsService: MeasurementsService,
    private snackBarRef: MatSnackBar
  ) { }

  saveMeasurements(): void {
    let name = this.nameFormControl.value;
    if (this.measurementResult.length === 0) {
      return;
    }
    if (this.nameFormControl.invalid) {
      return;
    }

    this.measurementsService.saveMeasurements(this.labId, this.measurementResult, name).subscribe(res => { });

    this.snackBarRef.open('Saved!', 'Hide', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: ['snackbar']
    });
  }
}
