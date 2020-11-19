import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Lab1PageComponent } from './components/lab1-page';
import { Lab1RoutingModule } from './lab1.routes';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CountdownComponent } from 'src/app/components/countdown/countdown.component';
import { CameraComponent } from 'src/app/components/camera/camera.component';

@NgModule({
    declarations: [
        Lab1PageComponent,
        CountdownComponent,
        CameraComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        MatCardModule,
        MatButtonModule,
        Lab1RoutingModule,
        MatSnackBarModule
    ]
})
export class Lab1Module { }
