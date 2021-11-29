import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Lab5PageComponent } from './page/lab5-page';
import { Lab5RoutingModule } from './lab5.routes';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        Lab5PageComponent
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
        SharedModule
    ]
})
export class Lab5Module { }
