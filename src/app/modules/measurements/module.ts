import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MeasurementsRoutingModule } from './routes';
import { MeasurementsPageComponent } from './ui/measurements-page';
import {MatTableModule} from '@angular/material/table';

@NgModule({
    declarations: [
        MeasurementsPageComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        MeasurementsRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatTableModule
    ]
})
export class MeasurementsPageModule { }
