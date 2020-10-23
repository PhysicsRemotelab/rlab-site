import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { LabsPageComponent } from './ui/labs-page';
import { LabsRoutingModule } from './routes';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LabsEffects } from './ngrx/labs.effects';
import { labsReducer } from './ngrx/labs.reducers';

@NgModule({
    declarations: [
        LabsPageComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatSortModule,
        MatTableModule,
        HttpClientModule,
        LabsRoutingModule,
        EffectsModule.forRoot([LabsEffects]),
        StoreModule.forRoot({ labsReducer }),
    ]
})
export class LabsPageModule { }
