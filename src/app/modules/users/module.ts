import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule, HttpClientModule, MatCardModule, MatButtonModule]
})
export class UsersModule {}
