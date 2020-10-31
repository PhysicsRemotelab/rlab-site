import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MeasurementsRoutingModule } from './routes';
import { MeasurementsPageComponent } from './ui/measurements-page';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MeasurementsEffects } from './state/measurements.effects';
import { measurementsReducer } from './state/measurements.reducers';
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
        MatTableModule,
        EffectsModule.forRoot([MeasurementsEffects]),
        StoreModule.forRoot({ measurementsReducer }),
    ]
})
export class MeasurementsPageModule { }
