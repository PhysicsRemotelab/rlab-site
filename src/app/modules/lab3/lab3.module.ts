import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Lab3RoutingModule } from './lab3.routes';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChartsModule } from 'ng2-charts';
import { Lab3PageComponent } from './page/lab3-page';
import { SharedModule } from '../shared/shared.module';
import { ResistancePlotComponent } from 'src/app/components/resistance-plot/resistance-plot.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [
        Lab3PageComponent,
        ResistancePlotComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        MatCardModule,
        MatButtonModule,
        Lab3RoutingModule,
        MatSnackBarModule,
        ChartsModule,
        SharedModule,
        MatSelectModule
    ]
})
export class Lab3Module { }
