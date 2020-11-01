import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-lab2-page',
  templateUrl: './lab2-page.html',
  styleUrls: ['./lab2-page.scss']
})
export class Lab2PageComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
      console.log('Lab 2 page');
    }

}
