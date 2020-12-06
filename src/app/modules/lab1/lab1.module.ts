import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Lab1PageComponent } from './page/lab1-page';
import { Lab1RoutingModule } from './lab1.routes';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChartsModule } from 'ng2-charts';
import { ScatterPlotComponent } from 'src/app/components/scatter-plot/scatter-plot.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        Lab1PageComponent,
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
        ChartsModule,
        SharedModule
    ]
})
export class Lab1Module { }
