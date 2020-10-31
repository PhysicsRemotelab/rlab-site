import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-measurements-page',
  templateUrl: './measurements-page.html',
  styleUrls: ['./measurements-page.scss']
})
export class MeasurementsPageComponent implements OnInit {

    constructor(
    ) { }

    ngOnInit(): void {
      console.log('Measurements page');
    }

}
