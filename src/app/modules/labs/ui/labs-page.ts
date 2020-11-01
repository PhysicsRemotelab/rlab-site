import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { getLabs } from '../ngrx/labs.actions';
import { LabsState } from '../ngrx/labs.reducers';
import { LabsSelector } from '../ngrx/labs.selectors';

@Component({
  selector: 'app-labs-page',
  templateUrl: './labs-page.html',
  styleUrls: ['./labs-page.scss']
})
export class LabsPageComponent implements OnInit, OnDestroy {

    labs = [];
    isAuthenticated = !!sessionStorage.getItem('email');
    currentUserId = sessionStorage.getItem('user_id');
    userEmail = sessionStorage.getItem('email');
    isUsingCurrentLab =  false;

    constructor(
      private store: Store<LabsState>,
      private labsSelector: LabsSelector,
      private router: Router
    ) { }

    ngOnInit(): void {
      console.log('Labs page');

      this.store.dispatch(getLabs());

      this.store.pipe(select(this.labsSelector.getLabs())).subscribe(labs => {
        this.labs = labs;
      });

    }

    startlab(id: number): void {
      console.log('start', id);
      this.router.navigateByUrl(`/lab${id}`);
    }

    continuelab(id: number): void {
      console.log('continue', id);
      this.router.navigateByUrl(`/lab${id}`);
    }

    ngOnDestroy(): void {
      console.log('destroy');
    }

}
