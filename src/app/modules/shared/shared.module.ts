import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CameraComponent } from 'src/app/components/camera/camera.component';
import { CountdownComponent } from 'src/app/components/countdown/countdown.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CountdownComponent,
        CameraComponent
    ],
    exports: [
        CountdownComponent,
        CameraComponent
    ]
})
export class SharedModule { }
