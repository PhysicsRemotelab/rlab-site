import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LabsService } from '../../labs/state/labs.service';

@Component({
  selector: 'app-lab1-page',
  templateUrl: './lab1-page.html',
  styleUrls: ['./lab1-page.scss']
})
export class Lab1PageComponent implements OnInit {

    labId: number;

    constructor(
      private labService: LabsService,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.route.queryParams.subscribe(params => {
        this.labId = +params.id;
      });
    }

    ngOnInit(): void {
      console.log('Lab 1 page');
    }

    freeLab(): void {
      this.labService.freeLab(this.labId).subscribe(result => {
        console.log(result);
        this.router.navigate([`/labs`]);
      });
    }
}
