import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './page/profile-page';
import { ProfileRoutingModule } from './routes';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [ProfilePageComponent],
    imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, HttpClientModule, ProfileRoutingModule]
})
export class ProfilePageModule {}
