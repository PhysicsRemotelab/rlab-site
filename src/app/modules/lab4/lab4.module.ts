import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Lab4PageComponent } from './components/lab4-page';
import { Lab4RoutingModule } from './lab4.routes';

@NgModule({
    declarations: [
        Lab4PageComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        MatCardModule,
        MatButtonModule,
        Lab4RoutingModule
    ]
})
export class Lab4Module { }
