import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Lab } from '../model';
import { getLabs } from '../state/labs.actions';
import { LabState } from '../state/labs.reducers';
import { getAllLabs } from '../state/labs.selectors';
import { LabsService } from '../state/labs.service';

@Component({
  selector: 'app-labs-page',
  templateUrl: './labs-page.html',
  styleUrls: ['./labs-page.scss']
})
export class LabsPageComponent implements OnInit, OnDestroy {

    labs = [];
    labs$: Observable<Lab[]>;

    isAuthenticated = !!sessionStorage.getItem('email');
    currentUserId = sessionStorage.getItem('user_id');
    userEmail = sessionStorage.getItem('email');
    isUsingCurrentLab =  false;

    constructor(
      private store: Store<LabState>,
      private router: Router,
      private labsService: LabsService
    ) { }

    ngOnInit(): void {
      console.log('Labs page');

      this.store.dispatch(getLabs());

      this.labs$ = this.store.select(getAllLabs);

    }

    startlab(id: number): void {
      console.log('start', id);
      this.labsService.useLab(id).subscribe(result => {
        console.log(result);
        if (result !== 0) {
          this.router.navigate([`/lab${id}`], { queryParams: { id }});
        }
      });
    }

    continuelab(id: number): void {
      console.log('continue', id);
      this.router.navigate([`/lab${id}`], { queryParams: { id }});
    }

    ngOnDestroy(): void {
    }

}
