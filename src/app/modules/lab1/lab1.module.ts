import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Lab1PageComponent } from './page/lab1-page';
import { Lab1RoutingModule } from './lab1.routes';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CountdownComponent } from 'src/app/components/countdown/countdown.component';
import { CameraComponent } from 'src/app/components/camera/camera.component';
import { ChartsModule } from 'ng2-charts';
import { ScatterPlotComponent } from 'src/app/components/scatter-plot/scatter-plot.component';

@NgModule({
    declarations: [
        Lab1PageComponent,
        CountdownComponent,
        CameraComponent,
        ScatterPlotComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        MatCardModule,
        MatButtonModule,
        Lab1RoutingModule,
        MatSnackBarModule,
        ChartsModule
    ]
})
export class Lab1Module { }
