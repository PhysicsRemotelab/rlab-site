import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './page/profile-page';
import { ProfileRoutingModule } from './routes';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [ProfilePageComponent],
    imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        MatInputModule,
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        HttpClientModule,
        ProfileRoutingModule
    ]
})
export class ProfilePageModule {}
