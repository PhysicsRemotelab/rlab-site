import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Lab2PageComponent } from './components/lab2-page';
import { Lab2RoutingModule } from './lab2.routes';

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
        Lab2RoutingModule
    ]
})
export class Lab2Module { }
