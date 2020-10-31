import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.html',
  styleUrls: ['./history-page.scss']
})
export class HistoryPageComponent implements OnInit {

    constructor(
    ) { }

    ngOnInit(): void {
      console.log('History page');
    }

}
