import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LabsPageComponent } from './ui/labs-page';
import { LabsRoutingModule } from './routes';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LabsEffects } from './ngrx/labs.effects';
import { labsReducer } from './ngrx/labs.reducers';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    declarations: [
        LabsPageComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        LabsRoutingModule,
        MatCardModule,
        MatButtonModule,
        EffectsModule.forRoot([LabsEffects]),
        StoreModule.forRoot({ labsReducer }),
    ]
})
export class LabsPageModule { }
