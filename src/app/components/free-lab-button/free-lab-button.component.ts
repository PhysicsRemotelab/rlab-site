import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LabsService } from 'src/app/modules/labs/state/labs.service';

@Component({
  selector: 'app-free-lab-button',
  templateUrl: './free-lab-button.component.html',
  styleUrls: ['./free-lab-button.component.scss']
})
export class FreeLabButtonComponent {

  @Input()
  labId: number;

  constructor(
    private labService: LabsService,
    private router: Router
  ) {}

  freeLab(): void {
    this.labService.freeLab(this.labId).subscribe(result => {
      this.router.navigate([`/labs`]);
    });
  }
}
