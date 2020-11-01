import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { select, Store } from '@ngrx/store';
import { Lab } from '../model';
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
    isAuthenticated = false;
    isUsingCurrentLab =  false;

    constructor(
      private store: Store<LabsState>,
      private labsSelector: LabsSelector,
      private auth: AuthService
    ) { }

    ngOnInit(): void {
      console.log('Labs page');

      this.store.dispatch(getLabs());

      this.store.pipe(select(this.labsSelector.getLabs())).subscribe(labs => {
        this.labs = labs;
      });

      this.auth.user$.subscribe(res => {
        console.log('isAuthenticated$', res);
        this.isAuthenticated = res;
      });

      const email = sessionStorage.getItem('email');
      console.log(email);
    }

    ngOnDestroy(): void {
      console.log('destroy');
    }

}
