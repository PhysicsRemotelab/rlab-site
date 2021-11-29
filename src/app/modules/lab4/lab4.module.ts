import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Lab4RoutingModule } from './lab4.routes';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { Lab4PageComponent } from './page/lab4-page';
import { TemperaturePlotComponent } from 'src/app/components/temperature-plot/temperature-plot.component';

@NgModule({
    declarations: [
        Lab4PageComponent,
        TemperaturePlotComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        MatCardModule,
        MatButtonModule,
        Lab4RoutingModule,
        MatSnackBarModule,
        NgChartsModule,
        SharedModule,
        MatSelectModule
    ]
})
export class Lab4Module { }
