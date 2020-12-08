import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy {

  @Input()
  endTime: Date;

  timer$$: Subscription;
  seconds = null;
  minutes = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.timer$$ = timer(1000, 1000).subscribe(x => {
      this.timeBetweenDates(this.endTime);
    });
  }

  timeBetweenDates(dateEntered: Date): void {
    const difference = new Date(dateEntered).getTime() - new Date().getTime();

    if (difference > 0) {
      this.seconds = Math.floor(difference / 1000) % 60;
      this.minutes = Math.floor(Math.floor(difference / 1000) / 60) % 60;
      this.minutes = ('00' + this.minutes).slice(-2);
      this.seconds = ('00' + this.seconds).slice(-2);
    } else {
      console.log('the end');
      this.timer$$.unsubscribe();
      this.router.navigate([`/labs`]);
    }
  }

  ngOnDestroy(): void {
    this.timer$$.unsubscribe();
  }

}
