import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CameraComponent } from 'src/app/components/camera/camera.component';
import { CountdownComponent } from 'src/app/components/countdown/countdown.component';
import { SpectrometerPlotComponent } from 'src/app/components/spectrometer-plot/spectrometer-plot.component';
import { GammaPlotComponent } from 'src/app/components/gamma-plot/gamma-plot.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CountdownComponent,
        CameraComponent,
        SpectrometerPlotComponent,
        GammaPlotComponent
    ],
    exports: [
        CountdownComponent,
        CameraComponent,
        SpectrometerPlotComponent,
        GammaPlotComponent
    ]
})
export class SharedModule { }
