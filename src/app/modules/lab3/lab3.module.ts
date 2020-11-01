import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Lab3PageComponent } from './components/lab3-page';
import { Lab3RoutingModule } from './lab3.routes';

@NgModule({
    declarations: [
        Lab3PageComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        MatCardModule,
        MatButtonModule,
        Lab3RoutingModule
    ]
})
export class Lab3Module { }
