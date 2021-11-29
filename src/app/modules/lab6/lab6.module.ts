import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Lab6RoutingModule } from './lab6.routes';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Lab6PageComponent } from './page/lab6-page';
import { SharedModule } from '../shared/shared.module';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [
        Lab6PageComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        MatCardModule,
        MatButtonModule,
        Lab6RoutingModule,
        MatSnackBarModule,
        NgChartsModule,
        SharedModule
    ]
})
export class Lab6Module { }
