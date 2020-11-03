import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Lab1PageComponent } from './components/lab1-page';
import { Lab1RoutingModule } from './lab1.routes';
import { CameraComponent } from 'src/app/components/camera/camera.component';

@NgModule({
    declarations: [
        Lab1PageComponent,
        CameraComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        MatCardModule,
        MatButtonModule,
        Lab1RoutingModule
    ]
})
export class Lab1Module { }
