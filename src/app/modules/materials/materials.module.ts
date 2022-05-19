import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsRoutingModule } from './materials.routes';
import { MaterialsPageComponent } from './page/materials-page';

@NgModule({
    declarations: [MaterialsPageComponent],
    imports: [CommonModule, RouterModule, HttpClientModule, MaterialsRoutingModule, MatCardModule, MatTableModule, MatIconModule, MatButtonModule],
    providers: []
})
export class MaterialsPageModule {}
