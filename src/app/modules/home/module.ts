import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { HomeRoutingModule } from './routes';
import { HomePageComponent } from './page/home-page';

@NgModule({
    declarations: [
        HomePageComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        HomeRoutingModule,
        MatCardModule,
        MatButtonModule
    ]
})
export class HomePageModule { }
