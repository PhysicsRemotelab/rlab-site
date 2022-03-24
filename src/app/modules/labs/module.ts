import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LabsPageComponent } from './page/labs-page';
import { LabsRoutingModule } from './routes';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [LabsPageComponent],
    imports: [CommonModule, RouterModule, HttpClientModule, LabsRoutingModule, MatCardModule, MatButtonModule, SharedModule]
})
export class LabsPageModule {}
