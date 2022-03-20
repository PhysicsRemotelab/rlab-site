import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CameraComponent } from 'src/app/components/camera/camera.component';
import { CountdownComponent } from 'src/app/components/countdown/countdown.component';
import { SpectrometerPlotComponent } from 'src/app/components/spectrometer-plot/spectrometer-plot.component';
import { GammaPlotComponent } from 'src/app/components/gamma-plot/gamma-plot.component';
import { SaveMeasurementComponent } from 'src/app/components/save-measurement/save-measurement.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FreeLabButtonComponent } from 'src/app/components/free-lab-button/free-lab-button.component';
import { StartStopMeasurementButtonComponent } from 'src/app/components/start-stop-measurement-button/start-stop-measurement-button.component';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule],
    declarations: [
        CountdownComponent,
        CameraComponent,
        SpectrometerPlotComponent,
        GammaPlotComponent,
        SaveMeasurementComponent,
        FreeLabButtonComponent,
        StartStopMeasurementButtonComponent
    ],
    exports: [
        CountdownComponent,
        CameraComponent,
        SpectrometerPlotComponent,
        GammaPlotComponent,
        SaveMeasurementComponent,
        FreeLabButtonComponent,
        StartStopMeasurementButtonComponent
    ]
})
export class SharedModule {}
