import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-lab3-page',
  templateUrl: './lab3-page.html',
  styleUrls: ['./lab3-page.scss']
})
export class Lab3PageComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
      console.log('Lab 3 page');
    }

}
