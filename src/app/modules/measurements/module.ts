import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MeasurementsRoutingModule } from './routes';
import { MeasurementsPageComponent } from './page/measurements-page';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    declarations: [MeasurementsPageComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatPaginatorModule,
        MatSortModule,
        HttpClientModule,
        MeasurementsRoutingModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule
    ],
    providers: [DatePipe]
})
export class MeasurementsPageModule {}
