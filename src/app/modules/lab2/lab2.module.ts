import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Lab2RoutingModule } from './lab2.routes';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgChartsModule } from 'ng2-charts';
import { Lab2PageComponent } from './page/lab2-page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        Lab2PageComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        MatCardModule,
        MatButtonModule,
        Lab2RoutingModule,
        MatSnackBarModule,
        NgChartsModule,
        SharedModule
    ]
})
export class Lab2Module { }
