import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { HistoryPageComponent } from './page/history-page';
import { HistoryRoutingModule } from './routes';

@NgModule({
    declarations: [
        HistoryPageComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        HistoryRoutingModule,
        MatCardModule,
        MatButtonModule
    ]
})
export class HistoryPageModule { }
