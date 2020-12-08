import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  @Input()
  cameraUrl: string;

  safeCameraUrl: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.safeCameraUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.cameraUrl);
  }
}
