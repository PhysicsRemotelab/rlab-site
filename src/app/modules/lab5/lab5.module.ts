import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Lab5RoutingModule } from './lab5.routes';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgChartsModule } from 'ng2-charts';
import { Lab5PageComponent } from './page/lab5-page';
import { SharedModule } from '../shared/shared.module';
import { ResistancePlotComponent } from 'src/app/components/resistance-plot/resistance-plot.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [
        Lab5PageComponent,
        ResistancePlotComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        MatCardModule,
        MatButtonModule,
        Lab5RoutingModule,
        MatSnackBarModule,
        NgChartsModule,
        SharedModule,
        MatSelectModule
    ]
})
export class Lab5Module { }
